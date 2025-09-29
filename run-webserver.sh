#!/bin/bash
# ./run-webserver [root path] [port]

root_path="${1:-"/opt/WebAssistentForensics/src"}"
port=${2:-9999}
log_file="${3:-"webserver.log"}"

# Function to start server with Python 3
start_python_server() {
    echo "Starting Python 3 HTTP server on port $2"
    cd "$1" && nohup python3 -m http.server "$2" >> "$(dirname "$1")/$log_file" 2>&1 &
}

# Function to start server with Node.js (http-server)
start_node_server() {
    echo "Starting Node.js HTTP server on port $2"
    nohup npx http-server "$1" -p "$2" >> "$(dirname "$1")/$log_file" 2>&1 &
}

# Function to start server with PHP
start_php_server() {
    echo "Starting PHP HTTP server on port $2"
    cd "$1" && nohup php -S localhost:"$2" >> "$(dirname "$1")/$log_file" 2>&1 &
}

# Function to start simple server with netcat (very basic)
start_netcat_server() {
    echo "Starting basic netcat HTTP server on port $2"
    local nc_pid
    # Create a simple response function
    {
        while true; do
            {
                echo "HTTP/1.1 200 OK"
                echo "Content-Type: text/html"
                echo "Connection: close"
                echo ""
                echo "<html><body><h1>Directory listing for $(pwd)</h1>"
                echo "<ul>"
                for file in *; do
                    if [[ -f "$file" ]]; then
                        echo "<li><a href=\"$file\">$file</a></li>"
                    elif [[ -d "$file" ]]; then
                        echo "<li><a href=\"$file/\">$file/</a></li>"
                    fi
                done
                echo "</ul></body></html>"
            } | nc -l -p "$2" -q 1
        done
    } >> "$(dirname "$1")/$log_file" 2>&1 &
    nc_pid=$!
    echo $nc_pid > "/tmp/webserver_nc_$2.pid"
}

# Function to start server with busybox httpd (if available)
start_busybox_server() {
    echo "Starting busybox HTTP server on port $2"
    cd "$1" && nohup busybox httpd -p "$2" -f >> "$(dirname "$1")/$log_file" 2>&1 &
}

# Function to start server with ruby
start_ruby_server() {
    echo "Starting Ruby HTTP server on port $2"
    cd "$1" && nohup ruby -run -ehttpd . -p"$2" >> "$(dirname "$1")/$log_file" 2>&1 &
}

# Function to start server with webfs (web file server)
start_webfs_server() {
    echo "Starting webfs HTTP server on port $2"
    nohup webfsd -r "$1" -p "$2" >> "$(dirname "$1")/$log_file" 2>&1 &
}

# Check if root path exists
if [ ! -d "${root_path}" ]; then
    echo "ERROR: The root path '${root_path}' does not exist" >&2
    exit 1
fi

# Create log file directory if it doesn't exist
log_dir=$(dirname "$(dirname "$root_path")/$log_file")
mkdir -p "$log_dir"

echo "Web server log: $log_dir/$log_file"

# Try servers in order of preference
if command -v npx > /dev/null 2>&1; then
    echo "Found npx (Node.js), attempting to start server..."
    start_node_server "${root_path}" "${port}"
    NODE_PID=$!
    sleep 2
    if kill -0 $NODE_PID 2>/dev/null; then
        echo "✓ Successfully started Node.js HTTP server on port ${port}"
        echo "Access it at http://localhost:${port}/"
        exit 0
    else
        echo "Node.js server failed, trying next option..."
    fi
fi

if command -v python3 > /dev/null 2>&1; then
    echo "Found Python 3, attempting to start server..."
    start_python_server "${root_path}" "${port}"
    PYTHON_PID=$!
    sleep 2
    if kill -0 $PYTHON_PID 2>/dev/null; then
        echo "✓ Successfully started Python 3 HTTP server on port ${port}"
        echo "Access it at http://localhost:${port}/"
        exit 0
    else
        echo "Python 3 server failed, trying next option..."
    fi
fi

if command -v php > /dev/null 2>&1; then
    echo "Found PHP, attempting to start server..."
    start_php_server "${root_path}" "${port}"
    PHP_PID=$!
    sleep 2
    if kill -0 $PHP_PID 2>/dev/null; then
        echo "✓ Successfully started PHP HTTP server on port ${port}"
        echo "Access it at http://localhost:${port}/"
        exit 0
    else
        echo "PHP server failed, trying next option..."
    fi
fi

if command -v busybox > /dev/null 2>&1 && busybox | grep -q httpd; then
    echo "Found busybox with httpd, attempting to start server..."
    start_busybox_server "${root_path}" "${port}"
    BUSYBOX_PID=$!
    sleep 2
    if kill -0 $BUSYBOX_PID 2>/dev/null; then
        echo "✓ Successfully started busybox HTTP server on port ${port}"
        echo "Access it at http://localhost:${port}/"
        exit 0
    else
        echo "Busybox server failed, trying next option..."
    fi
fi

if command -v ruby > /dev/null 2>&1; then
    echo "Found Ruby, attempting to start server..."
    start_ruby_server "${root_path}" "${port}"
    RUBY_PID=$!
    sleep 2
    if kill -0 $RUBY_PID 2>/dev/null; then
        echo "✓ Successfully started Ruby HTTP server on port ${port}"
        echo "Access it at http://localhost:${port}/"
        exit 0
    else
        echo "Ruby server failed, trying next option..."
    fi
fi

if command -v webfsd > /dev/null 2>&1; then
    echo "Found webfs, attempting to start server..."
    start_webfs_server "${root_path}" "${port}"
    WEBFS_PID=$!
    sleep 2
    if kill -0 $WEBFS_PID 2>/dev/null; then
        echo "✓ Successfully started webfs HTTP server on port ${port}"
        echo "Access it at http://localhost:${port}/"
        exit 0
    else
        echo "Webfs server failed, trying next option..."
    fi
fi

if command -v nc > /dev/null 2>&1; then
    echo "Found netcat, attempting to start basic HTTP server..."
    cd "${root_path}"
    start_netcat_server "${root_path}" "${port}"
    sleep 2
    # Check if netcat server is running by checking the pid file
    if [ -f "/tmp/webserver_nc_${port}.pid" ] && kill -0 $(cat "/tmp/webserver_nc_${port}.pid") 2>/dev/null; then
        echo "✓ Successfully started netcat HTTP server on port ${port}"
        echo "⚠️  Note: Netcat server provides basic directory listing only"
        echo "Access it at http://localhost:${port}/"
        exit 0
    else
        echo "Netcat server failed..."
    fi
fi

echo "ERROR: No suitable web server found. Please install one of the following:" >&2
echo "  - Node.js (with npx)" >&2
echo "  - Python 3" >&2
echo "  - PHP" >&2
echo "  - Busybox (with httpd)" >&2
echo "  - Ruby" >&2
echo "  - webfs" >&2
echo "  - netcat (nc)" >&2
exit 1
