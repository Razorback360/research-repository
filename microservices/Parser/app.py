import os
from flask import Flask, request
from utils import parseSav # type: ignore

app = Flask(__name__)

@app.route('/parse/spss', methods=['POST'])
def parseSpss():
    data = request.get_json() # type: ignore
    if data.get("path") is None:
        return "No name provided", 400

    path = data.get("path")
    splitPath = os.path.split(path)
    try:
        parseSav(splitPath[1])
    except:
        return 'Error parsing file', 400
    return 'Parsed Successfully', 200

if __name__ == '__main__':
    app.run(debug=True)