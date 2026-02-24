const fs = require('fs');

function walk(dir) {
    if (!fs.existsSync(dir)) return [];
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.tsx')) results.push(file);
        }
    });
    return results;
}

const dirs = ['./app/dashboard', './app/portal'];
let files = [];
dirs.forEach(dir => files = files.concat(walk(dir)));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // emerald to pastel-green
    content = content.replace(/emerald-/g, 'pastel-green-');
    
    // typography & coloring tweaks
    content = content.replace(/text-slate-900/g, 'text-foreground font-title');
    content = content.replace(/text-slate-800/g, 'text-foreground font-title');
    content = content.replace(/text-slate-700/g, 'text-foreground font-medium');
    content = content.replace(/text-slate-600/g, 'text-muted-foreground');
    content = content.replace(/text-slate-500/g, 'text-muted-foreground font-light');
    content = content.replace(/text-slate-400/g, 'text-muted-foreground font-light');
    
    // backgrounds and borders
    content = content.replace(/bg-slate-50(\/\d+)?/g, 'bg-card');
    content = content.replace(/bg-slate-100(\/\d+)?/g, 'bg-sand-gold-50');
    content = content.replace(/border-slate-[12]00/g, 'border-border');
    
    // custom dark buttons and tags
    content = content.replace(/bg-slate-900/g, 'bg-foreground');
    content = content.replace(/hover:bg-slate-800/g, 'hover:bg-foreground/90');

    // specific case for shadows
    content = content.replace(/shadow-slate-900\/20/g, 'shadow-sand-gold-900/10');
    
    fs.writeFileSync(file, content);
});
console.log('Done replacing styles in dashboard and portal');
