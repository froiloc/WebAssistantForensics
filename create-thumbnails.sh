#!/bin/bash
for file_type in png jpg gif
do
	find "./src/media/" -type f -size +0 -name "*.${file_type}" -not -iname "*-thumb.${file_type}" -exec \
		bash -c '
			[ -f "${1%.*}-thumb.'${file_type}'" ] || \
			convert "$1" -resize "'${1:-600}'x>" -strip -quality 85 -define png:compression-level=9 "${1%.*}-thumb.'${file_type}'" && \
			case "'${file_type}'" in 
				png) pngquant --quality=65-80 --strip --force --ext .png --skip-if-larger "${1%.*}-thumb.'${file_type}'";;
				jpg) jpegoptim --strip-all --max=75 "${1%.*}-thumb.'${file_type}'";;
				*) :;;
			esac
			' _ {} \;
done
