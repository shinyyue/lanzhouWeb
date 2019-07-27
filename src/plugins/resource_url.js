// JavaScript Document

console.log(1111122222)

function getURL(url) {
    var fileName = url.substring(url.lastIndexOf('/') + 1);
    document.getElementById("co_url").innerHTML = '<object classid="clsid:31B7EB4E-8B4B-11D1-A789-00A0CC6651A8" width="1100" height="713" codebase="http://www.cult3d.com/download/cult.cab#version=5,2,0,99">' +
        '<param name="SRC" value="resources/' + fileName + '">' +
        '<param name="ANTIALIASING" value="0">' +
        ' <embed pluginspage="http://www.cult3d.com/download/" width="1100" height="713" src="resources/' + fileName + '" antialiasing="0" type="application/x-cult3d-object"></embed>' +
        '</object>';
}

function getCOUrl(id, url) {
    var fileName = url;
    document.getElementById(id).innerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" width="1100" height="713">' +
        '<param name="movie" value="' + fileName + '">' +
        '<param name="quality" value="high">' +
        '<embed src="' + fileName + '" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash"  style="width: 100%; height: 100%"></embed>' +
        '</object>';
}


function getSWFUrl(id, url) {
    var fileName = url;
    document.getElementById(id).innerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" width="1400" height="713">' +
        '<param name="movie" value="' + fileName + '">' +
        '<param name="quality" value="high">' +
        '<embed src="' + fileName + '" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" style="width: 100%; height: 100%"></embed>' +
        '</object>';
}


function getDCRUrl(url) {
    var fileName = url.substring(url.lastIndexOf('/') + 1);
    document.getElementById("dcr_url").innerHTML = '<OBJECT classid="clsid:166B1BCA-3F9C-11CF-8075-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/director/sw.cab#version=8,5,1,0" WIDTH=1400 HEIGHT=713>' +
        '<param name=src value="resources/' + fileName + '">' +
        '<param name=swStretchStyle value=fill>' +
        '<param name=swRemote value="swSaveEnabled=true swVolume=true swRestart=true swPausePlay=true swFastForward=true swContextMenu=true ">' +
        '<PARAM NAME=bgColor VALUE=#DDDDDD>' +
        '<EMBED SRC="resources/' + fileName + '"" bgColor=#DDDDDD  WIDTH=1400 HEIGHT=713 swRemote="swSaveEnabled=true swVolume=true swRestart=true swPausePlay=true swFastForward=true swContextMenu=true " swStretchStyle=fill TYPE="application/x-director" PLUGINSPAGE="http://www.macromedia.com/shockwave/download/"></EMBED>' +
        '</OBJECT>';
}


function getCODCRUrl(url) {
    var fileName = url.substring(url.lastIndexOf('/') + 1);
    document.getElementById("co_url").innerHTML = '<OBJECT classid="clsid:166B1BCA-3F9C-11CF-8075-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/director/sw.cab#version=8,5,1,0" WIDTH=1100 HEIGHT=713>' +
        '<param name=src value="resources/' + fileName + '">' +
        '<param name=swStretchStyle value=fill>' +
        '<param name=swRemote value="swSaveEnabled=true swVolume=true swRestart=true swPausePlay=true swFastForward=true swContextMenu=true ">' +
        '<PARAM NAME=bgColor VALUE=#DDDDDD>' +
        '<EMBED SRC="resources/' + fileName + '"" bgColor=#DDDDDD  WIDTH=1100 HEIGHT=713 swRemote="swSaveEnabled=true swVolume=true swRestart=true swPausePlay=true swFastForward=true swContextMenu=true " swStretchStyle=fill TYPE="application/x-director" PLUGINSPAGE="http://www.macromedia.com/shockwave/download/"></EMBED>' +
        '</OBJECT>';
}

function getURLKao(url) {
    var fileName = url.substring(url.lastIndexOf('/') + 1);
    document.getElementById("co_url").innerHTML = '<object classid="clsid:31B7EB4E-8B4B-11D1-A789-00A0CC6651A8" width="1400" height="713" codebase="http://www.cult3d.com/download/cult.cab#version=5,2,0,99">' +
        '<param name="SRC" value="resources/' + fileName + '">' +
        '<param name="ANTIALIASING" value="0">' +
        ' <embed pluginspage="http://www.cult3d.com/download/" width="1400" height="713" src="resources/' + fileName + '" antialiasing="0" type="application/x-cult3d-object"></embed>' +
        '</object>';
}