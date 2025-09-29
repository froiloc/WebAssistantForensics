#!/bin/bash
npx=$(whereis npx | awk '{print $2}')
root_path="/opt/WebAssistentForensics/src"
port=9999
if [ -x "${npx}" ]
then
	if [ -d "${root_path}" ]
	then
		echo "Starting Webserver on port ${port}. Access it at http://localhost:9999/"
		nohup "${npx}" http-server /opt/WebAssistentForensics/src -o -p ${port} &
	else
		echo "ERROR: The root path '${root_path}' does not exist" >&2
		exit 1
	fi
else
	echo "ERROR: npx from the node.js package is not availiable. Please install node.js first." >&2
	exit 1
fi
