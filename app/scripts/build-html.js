#!/usr/bin/env node
"use strict";

var fs = require("fs");
var path = require("path");

var root = path.join(__dirname, "..", "..");

// Guard: the real config/content files are gitignored. On a fresh clone only the
// *.example.json files exist. Fail early with a clear, actionable message instead
// of an opaque ENOENT, so the showcase actually runs from a clone.
var requiredFiles = [
    path.join("app", "webapp", "model", "config.json"),
    path.join("content", "landing-de.json"),
    path.join("content", "landing-en.json"),
    path.join("content", "casestudy-de.json"),
    path.join("content", "casestudy-en.json")
];
var missing = requiredFiles.filter(function (rel) {
    return !fs.existsSync(path.join(root, rel));
});
if (missing.length > 0) {
    console.error("\nMissing required config/content files:\n");
    missing.forEach(function (rel) {
        var example = rel.replace(/\.json$/, ".example.json");
        console.error("  " + rel + "  (copy from " + example + ")");
    });
    console.error("\nThese files are gitignored. On a fresh clone, copy the");
    console.error("matching *.example.json file to the name above and fill in your");
    console.error("own data, then re-run this script. For example:\n");
    console.error("  cp app/webapp/model/config.example.json app/webapp/model/config.json");
    console.error("  cp content/landing-de.example.json content/landing-de.json");
    console.error("  cp content/landing-en.example.json content/landing-en.json");
    console.error("  cp content/casestudy-de.example.json content/casestudy-de.json");
    console.error("  cp content/casestudy-en.example.json content/casestudy-en.json\n");
    process.exit(1);
}

var config = JSON.parse(fs.readFileSync(path.join(root, "app", "webapp", "model", "config.json"), "utf8"));

var baseReplacements = {
    "{{EMAIL}}": config.owner.email,
    "{{PHONE}}": config.owner.phone,
    "{{PHONE_TEL}}": config.owner.phone.replace(/\s/g, ""),
    "{{ADDRESS}}": config.owner.location,
    "{{NAME}}": config.owner.name,
    "{{CALENDLY_URL}}": config.services.calendlyUrl,
    "{{GITHUB_URL}}": config.social.github,
    "{{LINKEDIN_URL}}": config.social.linkedin,
    "{{GULP_URL}}": config.social.gulp,
    "{{DOMAIN}}": config.site.domain
};

function flattenContent(obj) {
    var result = {};
    Object.keys(obj).forEach(function (key) {
        var val = obj[key];
        if (Array.isArray(val)) {
            val.forEach(function (item, i) {
                Object.keys(item).forEach(function (subKey) {
                    var capKey = subKey.charAt(0).toUpperCase() + subKey.slice(1);
                    // stats[0].value -> stat0Value, profileCards[0].title -> card0Title
                    var arrayKey = key.replace(/^profile/, "").replace(/s$/, "");
                    arrayKey = arrayKey.charAt(0).toLowerCase() + arrayKey.slice(1);
                    result["{{L." + arrayKey + i + capKey + "}}"] = item[subKey];
                });
            });
        } else {
            result["{{L." + key + "}}"] = String(val);
        }
    });
    return result;
}

var templates = [
    { tpl: "de/index.template.html", content: "content/landing-de.json", lang: "de" },
    { tpl: "en/index.template.html", content: "content/landing-en.json", lang: "en" },
    { tpl: "case-study/index.template.html", content: "content/casestudy-de.json", lang: "de" },
    { tpl: "case-study/en/index.template.html", content: "content/casestudy-en.json", lang: "en" },
    { tpl: "legal/impressum.template.html", content: null, lang: "de" },
    { tpl: "legal/datenschutz.template.html", content: null, lang: "de" }
];

templates.forEach(function (entry) {
    var src = path.join(root, entry.tpl);
    var dest = path.join(root, entry.tpl.replace(".template.html", ".html"));
    if (!fs.existsSync(src)) {
        console.warn("Template not found:", entry.tpl);
        return;
    }
    var content = fs.readFileSync(src, "utf8");

    // Base replacements (config data)
    Object.keys(baseReplacements).forEach(function (key) {
        content = content.split(key).join(baseReplacements[key]);
    });

    // Content replacements (landing page texts)
    if (entry.content) {
        var contentFile = path.join(root, entry.content);
        if (fs.existsSync(contentFile)) {
            var langContent = JSON.parse(fs.readFileSync(contentFile, "utf8"));
            var langReplacements = flattenContent(langContent);
            Object.keys(langReplacements).forEach(function (key) {
                content = content.split(key).join(langReplacements[key]);
            });
        }
    }

    fs.writeFileSync(dest, content);
    console.log(entry.tpl, "->", path.basename(dest));
});
