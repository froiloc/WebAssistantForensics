"""
Modul 7: Media-Spezifikations-Validierung für Phase 1

Validiert MEDIEN-SPEZIFIKATIONEN (nicht echte Dateien!).
Phase 1 erstellt Metadaten für den Maintainer zur Medienerstellung.

Prüft:
- Bild-Spezifikationen (data-media-spec)
- Video-Spezifikationen inkl. VTT
- Pflichtfelder für Maintainer
- Format-Vorgaben
- Bearbeitungsanweisungen
- Alt-Texte (BFSG)

Author: Claude (Phase 1 Module)
Date: 2025-10-27
"""

import json
from typing import Dict, List, Tuple
from bs4 import BeautifulSoup
import logging

from .base_validator import BaseValidator

logger = logging.getLogger(__name__)


class MediaValidator(BaseValidator):
    """
    Validiert Medien-SPEZIFIKATIONEN für Phase 1.
    
    WICHTIG: Prüft KEINE echten Dateien, sondern Metadaten!
    """
    
    def __init__(self, config: Dict = None):
        """
        Initialisiert Media Validator.
        
        Args:
            config: Konfiguration mit:
                - allowed_image_formats: List (default: ['PNG', 'JPG', 'JPEG', 'WebP', 'SVG'])
                - allowed_video_formats: List (default: ['MP4', 'WebM'])
                - min_resolution: str (default: '400x300')
        """
        super().__init__(config)
        
        self.allowed_image_formats = self.config.get('allowed_image_formats', ['PNG', 'JPG', 'JPEG', 'WebP', 'SVG'])
        self.allowed_video_formats = self.config.get('allowed_video_formats', ['MP4', 'WebM'])
        self.min_resolution = self.config.get('min_resolution', '400x300')
        
        logger.info(f"📷 MediaValidator initialisiert (Phase 1: Spezifikationen)")
    
    def validate(self, soup: BeautifulSoup, html_path: str = None, **kwargs) -> Tuple[List[Dict], List[Dict]]:
        """
        Validiert Medien-Spezifikationen.
        
        Args:
            soup: BeautifulSoup-Objekt
            html_path: Pfad zur HTML-Datei (für relative Pfade)
            
        Returns:
            Tuple[errors, warnings]
        """
        errors = []
        warnings = []
        
        # 1. Validiere Bilder
        img_errors, img_warnings = self._validate_images(soup)
        errors.extend(img_errors)
        warnings.extend(img_warnings)
        
        # 2. Validiere Videos
        video_errors, video_warnings = self._validate_videos(soup)
        errors.extend(video_errors)
        warnings.extend(video_warnings)
        
        logger.debug(f"Media-Validierung: {len(errors)} Fehler, {len(warnings)} Warnungen")
        
        return errors, warnings
    
    # ==========================================
    # Bild-Spezifikationen
    # ==========================================
    
    def _validate_images(self, soup: BeautifulSoup) -> Tuple[List[Dict], List[Dict]]:
        """
        Validiert Bild-Spezifikationen.
        
        Returns:
            Tuple[errors, warnings]
        """
        errors = []
        warnings = []
        
        images = soup.find_all('img')
        
        for img in images:
            src = img.get('src', 'unknown')
            
            # 1. data-media-spec vorhanden?
            if not img.get('data-media-spec'):
                errors.append(self._create_error(
                    'media-spec-missing',
                    f"Bild ohne Medien-Spezifikation (data-media-spec): {src[:50]}",
                    location=str(img)[:100]
                ))
                continue
            
            # 2. Parse JSON
            try:
                spec = json.loads(img['data-media-spec'])
            except json.JSONDecodeError as e:
                errors.append(self._create_error(
                    'media-spec-invalid-json',
                    f"Ungültiges JSON in data-media-spec: {e}",
                    location=str(img)[:100]
                ))
                continue
            
            # 3. Pflichtfelder prüfen
            required_fields = ['filename', 'type', 'format', 'description', 'editingInstructions']
            
            for field in required_fields:
                if field not in spec:
                    errors.append(self._create_error(
                        'media-spec-incomplete',
                        f"Pflichtfeld '{field}' fehlt in Medien-Spezifikation für {src[:50]}",
                        location=str(img)[:100],
                        field=field
                    ))
            
            # 4. Format validieren
            img_format = spec.get('format', '').upper()
            if img_format and img_format not in self.allowed_image_formats:
                errors.append(self._create_error(
                    'media-spec-invalid-format',
                    f"Ungültiges Format: '{img_format}'. Erlaubt: {', '.join(self.allowed_image_formats)}",
                    location=str(img)[:100]
                ))
            
            # 5. Auflösung prüfen (wenn angegeben)
            if 'minResolution' in spec:
                min_res = spec['minResolution']
                # Format: "800x600"
                if not self._is_valid_resolution_format(min_res):
                    warnings.append(self._create_warning(
                        'media-spec-resolution',
                        f"minResolution hat ungültiges Format: '{min_res}' (erwartet: '800x600')",
                        location=str(img)[:100]
                    ))
            
            # 6. Alt-Text prüfen (BFSG-Pflicht)
            if not img.get('alt'):
                errors.append(self._create_error(
                    'bfsg-alt-missing',
                    f"Bild ohne alt-Attribut (BFSG-Pflicht): {src[:50]}",
                    location=str(img)[:100],
                    wcag="1.1.1 (A)"
                ))
            
            # 7. Bearbeitungsanweisungen prüfen
            editing = spec.get('editingInstructions', '')
            if editing and len(editing) < 10:
                warnings.append(self._create_warning(
                    'media-spec-editing',
                    f"Bearbeitungsanweisungen sehr kurz ({len(editing)} Zeichen): {editing}",
                    location=str(img)[:100]
                ))
        
        return errors, warnings
    
    # ==========================================
    # Video-Spezifikationen
    # ==========================================
    
    def _validate_videos(self, soup: BeautifulSoup) -> Tuple[List[Dict], List[Dict]]:
        """
        Validiert Video-Spezifikationen inkl. VTT.
        
        Returns:
            Tuple[errors, warnings]
        """
        errors = []
        warnings = []
        
        videos = soup.find_all('video')
        
        for video in videos:
            # 1. data-media-spec vorhanden?
            if not video.get('data-media-spec'):
                errors.append(self._create_error(
                    'media-spec-missing',
                    "Video ohne Medien-Spezifikation (data-media-spec)",
                    location=str(video)[:100]
                ))
                continue
            
            # 2. Parse JSON
            try:
                spec = json.loads(video['data-media-spec'])
            except json.JSONDecodeError as e:
                errors.append(self._create_error(
                    'media-spec-invalid-json',
                    f"Ungültiges JSON in data-media-spec: {e}",
                    location=str(video)[:100]
                ))
                continue
            
            # 3. Pflichtfelder prüfen
            required_fields = ['filename', 'format', 'description', 'sceneDescription']
            
            for field in required_fields:
                if field not in spec:
                    errors.append(self._create_error(
                        'media-spec-incomplete',
                        f"Pflichtfeld '{field}' fehlt in Video-Spezifikation",
                        location=str(video)[:100],
                        field=field
                    ))
            
            # 4. Format validieren
            video_format = spec.get('format', '').upper()
            if video_format and video_format not in self.allowed_video_formats:
                errors.append(self._create_error(
                    'media-spec-invalid-format',
                    f"Ungültiges Video-Format: '{video_format}'. Erlaubt: {', '.join(self.allowed_video_formats)}",
                    location=str(video)[:100]
                ))
            
            # 5. VTT-Spezifikation prüfen
            if not video.get('data-vtt-spec'):
                errors.append(self._create_error(
                    'media-vtt-missing',
                    "Video ohne VTT-Spezifikation (data-vtt-spec) - Untertitel erforderlich",
                    location=str(video)[:100],
                    severity="error"
                ))
            else:
                # Validiere VTT-Spezifikation
                vtt_errors, vtt_warnings = self._validate_vtt_spec(video['data-vtt-spec'], str(video)[:100])
                errors.extend(vtt_errors)
                warnings.extend(vtt_warnings)
            
            # 6. Szenen-Beschreibung prüfen
            scene_desc = spec.get('sceneDescription', '')
            if scene_desc and len(scene_desc) < 20:
                warnings.append(self._create_warning(
                    'media-spec-scene',
                    f"Szenen-Beschreibung sehr kurz ({len(scene_desc)} Zeichen)",
                    location=str(video)[:100]
                ))
        
        return errors, warnings
    
    # ==========================================
    # VTT-Validierung
    # ==========================================
    
    def _validate_vtt_spec(self, vtt_spec_json: str, location: str) -> Tuple[List[Dict], List[Dict]]:
        """
        Validiert VTT-Spezifikation (JSON-LD Format).
        
        Args:
            vtt_spec_json: JSON-String mit VTT-Spezifikation
            location: Ort für Fehlermeldungen
            
        Returns:
            Tuple[errors, warnings]
        """
        errors = []
        warnings = []
        
        # 1. Parse JSON
        try:
            vtt_spec = json.loads(vtt_spec_json)
        except json.JSONDecodeError as e:
            errors.append(self._create_error(
                'media-vtt-invalid-json',
                f"Ungültiges JSON in data-vtt-spec: {e}",
                location=location
            ))
            return errors, warnings
        
        # 2. JSON-LD Struktur prüfen
        if vtt_spec.get('@context') != 'https://schema.org':
            warnings.append(self._create_warning(
                'media-vtt-context',
                f"VTT @context sollte 'https://schema.org' sein, gefunden: '{vtt_spec.get('@context')}'",
                location=location
            ))
        
        if vtt_spec.get('@type') != 'VideoObject':
            warnings.append(self._create_warning(
                'media-vtt-type',
                f"VTT @type sollte 'VideoObject' sein, gefunden: '{vtt_spec.get('@type')}'",
                location=location
            ))
        
        # 3. Transcript prüfen
        transcript = vtt_spec.get('transcript', [])
        
        if not transcript:
            errors.append(self._create_error(
                'media-vtt-transcript-missing',
                "VTT-Spezifikation ohne transcript Array",
                location=location
            ))
            return errors, warnings
        
        if not isinstance(transcript, list):
            errors.append(self._create_error(
                'media-vtt-transcript-format',
                "VTT transcript muss Array sein",
                location=location
            ))
            return errors, warnings
        
        # 4. Einzelne Untertitel prüfen
        for i, cue in enumerate(transcript):
            cue_loc = f"{location} transcript[{i}]"
            
            # Pflichtfelder
            if 'startTime' not in cue:
                errors.append(self._create_error(
                    'media-vtt-cue-incomplete',
                    f"Untertitel {i} fehlt 'startTime'",
                    location=cue_loc
                ))
            
            if 'endTime' not in cue:
                errors.append(self._create_error(
                    'media-vtt-cue-incomplete',
                    f"Untertitel {i} fehlt 'endTime'",
                    location=cue_loc
                ))
            
            if 'text' not in cue:
                errors.append(self._create_error(
                    'media-vtt-cue-incomplete',
                    f"Untertitel {i} fehlt 'text'",
                    location=cue_loc
                ))
            
            # Zeitstempel-Format prüfen (HH:MM:SS)
            if 'startTime' in cue:
                if not self._is_valid_timestamp(cue['startTime']):
                    errors.append(self._create_error(
                        'media-vtt-timestamp',
                        f"Ungültiges startTime Format: '{cue['startTime']}' (erwartet: 'HH:MM:SS')",
                        location=cue_loc
                    ))
            
            if 'endTime' in cue:
                if not self._is_valid_timestamp(cue['endTime']):
                    errors.append(self._create_error(
                        'media-vtt-timestamp',
                        f"Ungültiges endTime Format: '{cue['endTime']}' (erwartet: 'HH:MM:SS')",
                        location=cue_loc
                    ))
        
        # 5. Warne wenn wenige Untertitel
        if len(transcript) < 3:
            warnings.append(self._create_warning(
                'media-vtt-few-cues',
                f"Nur {len(transcript)} Untertitel - prüfen ob vollständig",
                location=location
            ))
        
        return errors, warnings
    
    # ==========================================
    # Hilfsmethoden
    # ==========================================
    
    def _is_valid_resolution_format(self, resolution: str) -> bool:
        """
        Prüft ob Auflösungs-Format valide ist (z.B. '800x600').
        
        Args:
            resolution: Auflösungs-String
            
        Returns:
            True wenn valide
        """
        import re
        return bool(re.match(r'^\d+x\d+$', resolution))
    
    def _is_valid_timestamp(self, timestamp: str) -> bool:
        """
        Prüft ob Zeitstempel-Format valide ist (HH:MM:SS oder MM:SS).
        
        Args:
            timestamp: Zeitstempel-String
            
        Returns:
            True wenn valide
        """
        import re
        # Format: HH:MM:SS oder MM:SS oder H:MM:SS
        return bool(re.match(r'^\d{1,2}:\d{2}:\d{2}$', timestamp))
