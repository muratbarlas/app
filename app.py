from flask import Flask, render_template, jsonify, request
import os
from flask_socketio import SocketIO, emit, send
app = Flask(__name__)
app.config['SECRET_KEY']= 'mysecret'
socketio = SocketIO(app)

#path_cwd = os.path.dirname(os.path.realpath(__file__))
#path_templates = os.path.join(path_cwd, "templates")
#path_static = os.path.join(path_cwd, "static")


def lets_print():
    print("bakalim girdi mi")
    if request.method == "POST":
        print("post request here")
        qtc_data = request.get_json()
        print(qtc_data)
    results = {'processed': 'true'}
    return jsonify(results)



#@app.route('/static/<path:path>', methods=['POST', 'GET'])
#@app.route('/app', methods=['POST', 'GET'])

#@app.route('/', methods = ['GET', 'POST'])
###


#@app.route('/', methods=['POST', 'GET'])
@app.route('/')
def index():
    #if (request.method == 'P0ST'):
        #print('posttt')
        #lets_print():
    #else:
        #print('gettt')
    return render_template('index.html')



@socketio.on('message')
def handleMessage(message):
    #print('working?')
    print('receivedMessage: ' + message)
    #emit('chat message', str(json), broadcast=True)



if __name__ == '__main__':

    #app.run(port=5000, debug=True)
    #app.run(debug=True)
    #socketio.run(app)
    app.run(host='0.0.0.0')