import random, string, os, requests
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from config import Config

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

app.config.from_object(Config)
app = Flask(__name__)

global charset, charset_length, max_page_content_length, hexagon_base, library_coordinate, chars
charset = 'abcdefghijklmnopqrstuvwxyz, .'
charset_length = len(charset)
max_page_content_length = 3200
hexagon_base = 36
library_coordinate = 0
chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
@app.route('/searchContent', methods=['POST'])
@cross_origin()
def searchByContent():
    text = request.json['text']
    text = ''.join([c for c in text.lower() if c in charset])
    text = text.rstrip().ljust(max_page_content_length, ' ')
    sum_value = 0
    for i, c in enumerate(text[::-1]):
        char_value = ord(c) - ord('a') if c.isalpha() else 28 if c == '.' else 27
        sum_value += char_value * (charset_length**i)
    wall = 0
    shelf = 0
    volume = 0
    page = 0
    for i in text+'aaaaaaaaaaa'[:12]:
        wall += chars.index(i)
    wall = str(round(wall/100))
    for i in text+'aaaaaaaaaaaaa'[:14]:
        shelf += chars.index(i)
    shelf = str(round(shelf/100))
    for i in text+'aaaaaaaaaaaaa'[:14]:
        volume += chars.index(i)
    volume = str((round(volume/10))).zfill(2)
    for i in text+'aaaaaaaaaaaaa'[:14]:
        page += chars.index(i)
    page = str(page)
    library_coordinate = int(page + volume + shelf + wall)
    result = library_coordinate * (charset_length**max_page_content_length) + sum_value
    result = convertToBase(result, hexagon_base)
    return jsonify(result+":"+wall+":"+shelf+":"+volume+":"+page)

@app.route('/searchAddress', methods=['POST'])
@cross_origin()
def searchByAddress():
    address = request.json["address"]
    hexagon_address, wall, shelf, volume, page = address.split(':')
    volume = volume.zfill(2)
    page = page.zfill(3)
    library_coordinate = int(page + volume + shelf + wall)

    seed = int(hexagon_address, hexagon_base) - library_coordinate * (charset_length**max_page_content_length)
    hexagon_base_result = convertToBase(seed, hexagon_base)
    result = convertToBase(int(hexagon_base_result, hexagon_base), charset_length)

    if len(result) < max_page_content_length:
        random.seed(result)
        while len(result) < max_page_content_length:
            result += charset[int(random.random() * len(charset))]
    elif len(result) > max_page_content_length:
        result = result[-max_page_content_length:]
    return jsonify(result)

def convertToBase(x, base):
    if base == 36: digs = string.digits + 'abcdefghijklmnopqrstuvwxyz'
    elif base == 10: digs = '0123456789'
    elif base == 60: digs = '0123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    else: digs = charset

    if x < 0: sign = -1
    elif x == 0: return digs[0]
    else: sign = 1

    x *= sign
    chars = []
    while x:
        chars.append(digs[x % base])
        x //= base
    if sign < 0:
        chars.append('-')
    chars.reverse()
    return ''.join(chars)


if __name__ == '__main__':
    # Disable SSL verification
    requests.packages.urllib3.disable_warnings()

    app.run(host='0.0.0.0', port=8000)