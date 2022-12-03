const fs = require("fs");
const path = require("path");

const files = [];
const files_path = "C:\\Users\\ALYN\\Desktop\\samp_mobile_client\\data\\files\\";

function getFiles(dir) {
    fs.readdirSync(dir).forEach(file => {
        const absolute = path.join(dir, file);
        if (fs.statSync(absolute).isDirectory())
            return getFiles(absolute);
        else
            return files.push(absolute);
    });
}

getFiles(files_path);

const data_list = "{\"files\": []}";
const obj = JSON.parse(data_list);

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), "g"), replace);
}

files.forEach(file => {
    const stats = fs.statSync(file);
    obj["files"].push({
        "name": path.basename(file),
        "path": file.replaceAll(files_path, "").replaceAll("\\", "/"),
        "size": "" + stats.size,
        "url": "https://github.com/ALYNADV/samp_mobile_client/raw/main/data/files/" + file.replaceAll(files_path, "").replaceAll("\\", "/")
    });
});

fs.writeFile("list.json", JSON.stringify(obj, null, 4), (err) => {
    if (err) {
        console.error(err);
        return;
    }

    console.log("Done");
});
