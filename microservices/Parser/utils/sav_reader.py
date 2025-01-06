import json
import codecs
import re
import os
from savReaderWriter import SavHeaderReader as savHeaderReader # type: ignore
from savReaderWriter import SavReader as savReader # type: ignore

def cpGenerateMapping(name,enableUtf):
    # type: (str, bool) -> None
    strippedName = os.path.splitext(name)[0]
    with savHeaderReader("uploads/"+strippedName+"/"+name, ioUtf8=enableUtf) as header:
        metadata = header.all()
    data = metadata.valueLabels
    newdict = {}
    with codecs.open("uploads/"+strippedName+"/mapping-"+strippedName+".json", "w") as f:
        for key in data.keys():
            convertedKey = key.encode("utf-8").replace("\\", "\\\\")
            convertedValue = data[key]
            if type(convertedValue) == dict:
                for key, value in convertedValue.iteritems(): # type: ignore
                    newVal = value.encode("utf-8").replace("\\", "\\\\")
                    convertedValue[key] = newVal
            newdict[convertedKey] = convertedValue
        data = json.dumps(newdict, ensure_ascii=False)
        f.write(data)

def generateMapping(name,enableUtf):
    # type: (str, bool) -> None
    strippedName = os.path.splitext(name)[0]
    with savHeaderReader("uploads/"+strippedName+"/"+name, ioUtf8=enableUtf) as header:
        metadata = header.all()
    data = metadata.valueLabels
    with codecs.open("uploads/"+strippedName+"/mapping-"+strippedName+".json", "w") as f:
        data = json.dumps(data, ensure_ascii=False)
        f.write(data)

def generateReport(name,enableUtf):
    # type: (str, bool) -> None
    
    strippedName = os.path.splitext(name)[0]

    if enableUtf:
        spss_file = savReader("uploads/"+strippedName+"/"+name+"", ioUtf8=True, returnHeader=True)
    else:
        spss_file = savReader("uploads/"+strippedName+"/"+name+"", returnHeader=True)
    try:
        report = spss_file.getFileReport()
    except Exception,e: # type: ignore
        spss_file.close()
        raise e # type: ignore
    sample = spss_file.head()
    header = spss_file.next()
    
    lines = report.split('\n')
    filtered_lines = []

    for line in lines:
        # Check if the line contains variable information
        if re.match(r'^\s*\d+\.\s+\w+', line):
            filtered_lines.append(line)
        # Check if the line contains the summary of columns and rows
        elif re.match(r'^\*File.*has \d+ columns.*and \d+ rows', line):
            filtered_lines.append(line)
    with codecs.open("uploads/"+strippedName+"/report-"+strippedName+".txt", "w") as f:
        f.write('\n'.join(filtered_lines))
    
    with codecs.open("uploads/"+strippedName+"/sample-"+strippedName+".json", "w") as f:
        finalSample = [header, sample]
        dumped = json.dumps(finalSample, ensure_ascii=False)
        f.write(dumped)
    
    spss_file.close()
        

def parseSav(name):
    # type: (str) -> None
    try:
        cpGenerateMapping(name, True)
    except UnicodeEncodeError:
        try:
            generateMapping(name, True)
        except UnicodeEncodeError:
            generateMapping(name, False)
            pass
        except:
            generateMapping(name, False)
            pass
        pass
    except:
        try:
            generateMapping(name, True)
        except UnicodeEncodeError:
            generateMapping(name, False)
            pass
        except:
            generateMapping(name, False)
            pass
        pass
            
    try:
        generateReport(name, True)
    except UnicodeEncodeError:
        try:
            generateReport(name, False)
        except:
            pass
        pass