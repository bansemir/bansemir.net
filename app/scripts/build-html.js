#!/usr/bin/env node
"use strict";

var fs = require("fs");
var path = require("path");

var root = path.join(__dirname, "..", "..");
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
