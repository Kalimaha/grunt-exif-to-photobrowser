/*
 * grunt-exif-to-photobrowser
 * https://github.com/Kalimaha/grunt-exif-to-photobrowser
 *
 * Copyright (c) 2016 Guido Barbaglia
 * Licensed under the MIT license.
 */
/*global exports, require*/
'use strict';

/**
 * Read an XML file and convert it into a string.
 * @param filepath The absolute path to the file.
 * @returns {*} The string of the content.
 */
exports.xml2string = function (filepath) {
    var fs = require('fs'),
        file;
    if (filepath.indexOf('.xml') < 0) {
        throw new Error('Please provide a file with the XML extension.');
    }
    try {
        file = fs.readFileSync(filepath, 'utf8');
    } catch (e) {
        throw new Error('No such file or directory.');
    }
    return file;
};

/**
 * Convert an XML string into a JSON object.
 * @param xml_string The XML string.
 * @returns {*} A JSON representation of the original string.
 */
exports.string2json = function (xml_string) {
    var parser = require('xml2json');
    return parser.toJson(xml_string, {
        object: true,
        arrayNotation: true
    });
};

/**
 * The format returned by the xml2json plug-in is not suitable for further
 * manipulation. This function create an array of work objects.
 * @param json The JSON object produced by the xml2json plug-in.
 * @returns {*} An array of objects.
 */
exports.json2array = function (json) {
    var works = [],
        i;
    for (i = 0; i < json.works[0].work.length; i += 1) {
        works.push(json.works[0].work[i]);
    }
    return works;
};

//exports.create_html_file = function (template_name, output_directory, output_name) {
//    var handlebars = require('handlebars'),
//        fs = require('fs'),
//        data = {
//            title: 'Photo Browser Index'
//        },
//        source = fs.readFileSync('src/html/index.hbs', 'utf-8'),
//        template = handlebars.compile(source),
//        html = template(data);
//};

exports.create_html_file = function (file_content, output_directory, output_name) {
    var fs = require('fs'),
        path = require('path');
    if (!fs.lstatSync(output_directory).isDirectory()) {
        throw new Error(output_directory + ' is not a directory.');
    }
    try {
        fs.writeFile(path.join(output_directory, output_name), file_content, function (err) {
            if (err) {
                throw new Error(err);
            }
        });
    } catch (e) {
        throw new Error('Error while writing the file');
    }
};