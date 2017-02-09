#!/usr/bin/env python3
from __future__ import print_function
import httplib2
import os

from apiclient import discovery
import oauth2client
from oauth2client import client
from oauth2client import tools

import datetime
import socketserver, subprocess, sys
from urllib.request import urlopen
from threading import Thread
from pprint import pprint
from urllib.error import HTTPError
import json
import codecs

HOST = 'localhost'
PORT = 2000
SL_KEY = open('config/sl_key').read().strip()
SITE_ID= '9202' # 9202 = Bergshamra
LOCATION = 'Stockholm'
WEATHER_KEY = open('config/weather_key').read().strip()

try:
    import argparse
    flags = argparse.ArgumentParser(parents=[tools.argparser]).parse_args()
except ImportError:
    flags = None

SCOPES = 'https://www.googleapis.com/auth/calendar.readonly'
CLIENT_SECRET_FILE = 'config/client_secret.json'
APPLICATION_NAME = 'Google Calendar API Python Quickstart'


def get_credentials():
    home_dir = os.path.expanduser('~')
    credential_dir = os.path.join(home_dir, '.credentials')
    if not os.path.exists(credential_dir):
        os.makedirs(credential_dir)
    credential_path = os.path.join(credential_dir, 'calendar-python-quickstart.json')
    store = oauth2client.file.Storage(credential_path)
    credentials = store.get()
    if not credentials or credentials.invalid:
        flow = client.flow_from_clientsecrets(CLIENT_SECRET_FILE, SCOPES)
        flow.user_agent = APPLICATION_NAME
        if flags:
            credentials = tools.run_flow(flow, store, flags)
        else: # Needed only for compatibility with Python 2.6
            credentials = tools.run(flow, store)
        print('Storing credentials to ' + credential_path)
    return credentials

def get_events():
    credentials = get_credentials()
    http = credentials.authorize(httplib2.Http())
    service = discovery.build('calendar', 'v3', http=http)

    now = datetime.datetime.utcnow().isoformat() + 'Z' # 'Z' indicates UTC time
    
    calendarList = service.calendarList().list().execute()
    events = []
    for calendar in calendarList['items']:
        eventsResult = service.events().list(
            calendarId=calendar['id'], timeMin=now, maxResults=10, singleEvents=True,
            orderBy='startTime').execute()
        for event in eventsResult.get('items', []):
            e = {
                "summary": event['summary'].replace("'","").replace('"',""),
                "start": event['start']
            }
            events.append(e)
    return events

class SingleTCPHandler(socketserver.BaseRequestHandler):
    "One instance per connection.  Override handle(self) to customize action."

    def send_message(self, message=""):
        self.request.send((str(message)+"\n").encode('utf-8'))

    def handle(self):
        # self.request is the client connection
        recv = self.request.recv(1024)  # clip input at 1Kb
        recvtext = recv.decode('utf-8')
        print(recvtext.split("\n")[0])
        path = recvtext.split()[1]

        self.send_message("HTTP/1.1 200 OK")
        self.send_message("Server : MagicMirror 0.1 Beta")
        if path == "/":
            self.send_message()
            page = codecs.open("index.html", 'r', 'utf-8')
            for line in page: 
                self.send_message(line)
        elif path == "/api/v1/sl":
            self.send_message("Access-Control-Allow-Origin: *")
            self.send_message("Content-Type: application/json")
            self.send_message()
            try:
                text = urlopen('http://api.sl.se/api2/realtimedeparturesV4.json?key='+SL_KEY+'&siteid='+SITE_ID+'&timewindow=60')
                data = json.loads(text.read().decode('utf-8'))['ResponseData']['Metros']
                self.send_message(json.dumps(data))
            except HTTPError as e:
                print(e)
        elif path == "/api/v1/weather":
            self.send_message("Access-Control-Allow-Origin: *")
            self.send_message("Content-Type: application/json")
            self.send_message()
            try:
                text = urlopen('http://api.openweathermap.org/data/2.5/weather?q='+LOCATION+'&APPID='+WEATHER_KEY)
                data = json.loads(text.read().decode('utf-8'))
                self.send_message(json.dumps(data))
            except HTTPError as e:
                print(e)
        elif path == "/api/v1/schedule":
            self.send_message("Access-Control-Allow-Origin: *")
            self.send_message("Content-Type: application/json")
            self.send_message()
            events = get_events()
            self.send_message(str(events).replace("'",'"'))
        else:
            self.send_message()
            try:
                page = open(path.strip("/ \n"), 'rb')
                for line in page:
                    self.request.send(line)
            except:
                print("Error while processing: " + path)
                print("Unexpected error:" + str(sys.exc_info()[0]))
                raise

        self.request.close()

    def end_headers(self):
        self.send_my_headers()

        SimpleHTTPServer.SimpleHTTPRequestHandler.end_headers(self)

    def send_my_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")


def print_data(data):
    for metro in data:
        print(str.encode(str(metro['GroupOfLineId']) + " " + metro['Destination'] + " " + metro['DisplayTime'] + "\n"))
        self.request.send(str.encode(str(metro['GroupOfLineId']) + " " + metro['Destination'] + " " + metro['DisplayTime'] + "\n"))
        if 'Deviations' in metro:
            for deviation in metro['Deviations']:
                print(deviation)

class SimpleServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    # Ctrl-C will cleanly kill all spawned threads
    daemon_threads = True
    # much faster rebinding
    allow_reuse_address = True

    def __init__(self, server_address, RequestHandlerClass):
        socketserver.TCPServer.__init__(self, server_address, RequestHandlerClass)

if __name__ == "__main__":
    server = SimpleServer((HOST, PORT), SingleTCPHandler)
    # terminate with Ctrl-C
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        sys.exit(0)
