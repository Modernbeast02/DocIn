from flask import Flask, request, jsonify, json
from flask_cors import CORS,cross_origin
import pandas as pd
import numpy as np
import pickle
from numpy.linalg import norm
from sklearn.neighbors import NearestNeighbors
from io import BytesIO
from PIL import Image
import cv2
from bson import ObjectId


import os
import tensorflow as tf
import tensorflow as tf
from tensorflow import keras
import keras_ocr 
from PIL import Image
from pytesseract import pytesseract
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from spellchecker import SpellChecker
from gridfs import GridFS
from werkzeug.utils import secure_filename
from pymongo import MongoClient

spell = SpellChecker()

mongo_client = MongoClient('mongodb+srv://yashitabansal39:sq59PoNu6yIgQDQm@docin.ctd79y8.mongodb.net/')
db = mongo_client['userToDoc']
fs = GridFS(db)

db_manual_review = mongo_client['manualReview']
fs_manual_review = GridFS(db_manual_review)

def isPresent(token):
    digits = "0123456789.-,'()!:;+‘%$#@&^*|"
    present = 0
    for i in range(len(token)):
        if token[i] in digits:
            present = 1
            return True
    return False
 

def final_tokens(token_list):
    res = []
    list = token_list
    for token in list:
        token = str(token)
        if not isPresent(token):
            if spell.correction(token) == token:
                if token.lower() not in res:
                    res.append(token.lower())

    final__tokens = res
    return final__tokens


stop_words = set(stopwords.words('english'))


pipeline = keras_ocr.pipeline.Pipeline()

app = Flask(__name__)

cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'


#load model pickel file
with open('../model/model.pickle', 'rb') as f:
    model = pickle.load(f)

with open('../model/features.json') as f:
    featureJson = json.load(f)
feature_names = featureJson['feature_names']
# print(feature_names)
#load dataframe
# df = pd.read_csv("../model/data.csv")

#Perprocessing Functions
#model -> [3660] -  1 0 1 0 0 0 -> Class


class FileDocument:
    def __init__(self, user_id, filename, file_id):
        self.user_id = user_id
        self.filename = filename
        self.file_id = file_id

def preprocessImage(img):
    # keras_ocr.tools.
    # images = [keras_ocr.tools.read(img)]
    # prediction_groups = pipeline.recognize(images)
    # predicted_image_1 = prediction_groups[0]
    # image_text_list = []
    # for text, box in predicted_image_1:
    #     image_text_list.append(text)
    # image_text = " "
    # image_text = image_text.join(image_text_list)

    path_to_tesseract = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
    pytesseract.tesseract_cmd = path_to_tesseract
    #Extract text from image
    image_text = pytesseract.image_to_string(img)

    word_tokens = word_tokenize(image_text)
    image_tokens = [w for w in word_tokens if not w.lower() in stop_words]
    final_image_tokens = final_tokens(image_tokens)
    print("finalImageToken")
    print(final_image_tokens)
    rowOfImage = [0]*(len(feature_names))
    for i in range(len(feature_names)):
        if feature_names[i] in final_image_tokens:
            rowOfImage[i] = 1
    # print(rowOfImage)
    return rowOfImage


@app.route('/',  methods = ['GET', 'POST'])
def main():
    return "hi"

@app.route('/getClass', methods = ['POST'])
def getClass():
    file = request.files['file']
    # imageLoaded = Image.open(file)
    file.save("sample.png", "")
    imagePreprocessedArray = preprocessImage("sample.png")
    # print(imagePreprocessedArray)
    prediction = model.predict([imagePreprocessedArray])
    print(prediction)
    os.remove("sample.png")
    return json.dumps(prediction[0])

    # return "skndvnjsvn"

@app.route('/storeDoc',  methods = ['GET', 'POST'])
def storeDoc():

    file = request.files['file']
    user_id = request.form['userId']

    # Save file to GridFS
    filename = secure_filename(file.filename)
    file_id = fs.put(file, filename=filename, userId=user_id)

    # # Create a FileDocument instance
    file_doc = FileDocument(user_id=user_id, filename=filename, file_id=file_id)

    # # Insert file information into a MongoDB collection (optional)
    db.file_info.insert_one(file_doc.__dict__)
    print(user_id)
    print(filename)
    return f"File uploaded successfully with ID: ."

@app.route('/manualReview',  methods = ['GET', 'POST'])
def manualReview():
    user_id = request.form['userId']

    # # Create a FileDocument instance
    # # Insert file information into a MongoDB collection (optional)
    db_manual_review['DocIn'].insert_one({'user_id': user_id})
    print(user_id)

    return f"User Info Stored Successfully ."


@app.route('/fetchUserData',  methods = ['GET', 'POST'])
def fetchUserData():
    result = db_manual_review['DocIn'].find()

    # # Convert the cursor result to a list of dictionaries
    data_list = list(result)
    print(data_list)

    # # Convert ObjectId to string representation
    user_ids = [item['user_id'] for item in data_list]
    return jsonify(user_ids)

if __name__=='__main__':  
    app.run(debug=True, port ='5000')