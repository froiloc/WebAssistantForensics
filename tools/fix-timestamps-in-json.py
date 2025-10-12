#!/usr/bin/env python3
import json
import os
import argparse
from datetime import datetime

def convert_to_iso8601(time_str: str) -> str:
    """
    Versucht, einen Zeitstempel-String anhand bekannter Formate zu parsen 
    und ihn in das strikte ISO 8601-Format (YYYY-MM-DDTHH:MM:SS) zu konvertieren.
    """
    # Liste der erwarteten Zeitstempelformate (von spezifisch nach allgemein)
    formats = [
        # Format 1: DE-Format in Messages (z.B. "8.10.2025, 10:18:46")
        "%d.%m.%Y, %H:%M:%S",
        # Format 2: US-Format in Metadaten (z.B. "10/8/2025 10:18:44")
        "%m/%d/%Y %H:%M:%S"
    ]
    
    for fmt in formats:
        try:
            # Versuch, den String mit einem bekannten Format zu parsen
            dt_object = datetime.strptime(time_str, fmt)
            # Konvertierung in ISO 8601 mit 'T' als Trennzeichen
            return dt_object.isoformat(sep='T')
        except ValueError:
            # Falls das aktuelle Format fehlschlägt, das nächste versuchen
            continue
            
    # Fehlerbehandlung, falls kein Format passt
    raise ValueError(f"Zeitstempel-String '{time_str}' entspricht keinem bekannten Format.")


def process_chat_log(input_filepath: str, output_filepath: str):
    """
    Lädt die JSON-Datei, konvertiert alle Zeitstempel in ISO 8601 und speichert das Ergebnis.
    """
    print(f"Lese Datei: {input_filepath}")
    
    # --- 1. Datei laden ---
    try:
        with open(input_filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except FileNotFoundError:
        print(f"FEHLER: Eingabedatei nicht gefunden: {input_filepath}")
        return
    except json.JSONDecodeError:
        print(f"FEHLER: Die Datei '{input_filepath}' ist kein gültiges JSON.")
        return

    # --- 2. Metadaten-Zeitstempel konvertieren ---
    if 'metadata' in data and 'dates' in data['metadata']:
        print("Verarbeite Metadaten-Zeitstempel...")
        for key, value in list(data['metadata']['dates'].items()):
            try:
                data['metadata']['dates'][key] = convert_to_iso8601(value)
            except ValueError as e:
                print(f"  -> FEHLER in Metadaten '{key}': {e}")
                
    # --- 3. Nachrichten-Zeitstempel konvertieren ---
    if 'messages' in data and isinstance(data['messages'], list):
        print(f"Verarbeite {len(data['messages'])} Chat-Nachrichten...")
        for message in data['messages']:
            if 'time' in message:
                try:
                    # Umbenennung von 'time' zu 'time_iso8601'
                    iso_time = convert_to_iso8601(message.pop('time'))
                    message['time_iso8601'] = iso_time
                except ValueError as e:
                    print(f"  -> FEHLER in Nachricht {message.get('role', 'N/A')}: {e}")
                    # Bei Fehler das Originalfeld wiederherstellen
                    message['time_iso8601'] = "CONVERSION_FAILED"
                    
    # --- 4. Speichern der bereinigten Datei ---
    try:
        with open(output_filepath, 'w', encoding='utf-8') as f:
            # json.dump mit indent=2 für bessere Lesbarkeit
            json.dump(data, f, indent=2, ensure_ascii=False)
            
        print(f"\nERFOLG! Bereinigte Daten gespeichert in: {output_filepath}")
    except IOError as e:
        print(f"FEHLER beim Speichern der Datei: {e}")


def main():
    """Definiert Argumente und startet den Verarbeitungsprozess."""
    
    parser = argparse.ArgumentParser(
        description="Konvertiert alle bekannten Zeitstempel (z.B. DE-Format) in einer JSON-Chatlog-Datei in das strikte ISO 8601-Format (YYYY-MM-DDTHH:MM:SS).",
        formatter_class=argparse.RawTextHelpFormatter
    )
    
    # Positionales Pflichtargument: input_file
    parser.add_argument(
        'input_file',
        type=str,
        help="Pfad zur Eingabe-JSON-Datei (Chatlog)."
    )
    
    # Optionales Argument: --output oder -o
    parser.add_argument(
        '-o', '--output',
        type=str,
        default=None,
        help=(
            "Optionaler Pfad zur Ausgabe-JSON-Datei.\n"
            "Wird automatisch als '<Dateiname>_iso.json' abgeleitet, \n"
            "falls dieser Parameter weggelassen wird."
        )
    )

    args = parser.parse_args()
    
    input_filepath = args.input_file
    
    # Ableitung des Output-Pfades, falls nicht angegeben
    if args.output:
        output_filepath = args.output
    else:
        # file.json -> file_iso.json
        base, ext = os.path.splitext(input_filepath)
        output_filepath = f"{base}_iso{ext}"
        
    process_chat_log(input_filepath, output_filepath)


if __name__ == "__main__":
    main()
