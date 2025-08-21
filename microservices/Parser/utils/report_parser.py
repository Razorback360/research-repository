import re
import json
import os

def parse_report_file(fileName):
    strippedName = os.path.splitext(fileName)[0]

    with open("uploads/datasets/"+strippedName+"/report-"+strippedName+".txt", 'r') as f:
        content = f.read()
    
    # Extract file info from first line
    file_info = re.search(r"'([^']+)' \(([\d.]+) kB\) has (\d+) columns \(variables\) and (\d+) rows \((\d+) values\)", content)
    if not file_info:
        raise ValueError("File info line not found or does not match expected format.")
    filename = file_info.group(1).split('/')[-1]
    filesize = file_info.group(2)
    total_columns = int(file_info.group(3))
    total_rows = int(file_info.group(4))
    total_values = int(file_info.group(5))

    # Extract column information
    columns = []
    column_pattern = r"\d+\.\s+(\w+(?:\.\d+)?)\s+\((\w\d+)\s+-\s+(\w+)\)"
    column_matches = re.finditer(column_pattern, content)
    
    for match in column_matches:
        column = {
            "name": match.group(1),
            "type": match.group(3),
            "format": match.group(2)
        }
        columns.append(column)

    # Create final JSON structure
    json_data = {
        "filename": filename,
        "fileSize": filesize+" kB",
        "totalColumns": total_columns,
        "totalRows": total_rows,
        "totalValues": total_values,
        "columns": columns
    }

    # Write to JSON file
    with open("uploads/datasets/"+strippedName+"/report-"+strippedName+".json", 'w') as f:
        json.dump(json_data, f, indent=2)
