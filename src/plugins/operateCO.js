// JavaScript Document
/**
 * @author ��ǿ
 * @date 2011-11-14 21:10:00
 * @fileName operatorCO
 */
var Cult3D;
var cameras = ["soundplayer", "reset", "refresh", "Camera01", "Camera02", "Camera03", "Camera04", "Camera05", "Camera06", "Camera07", "Camera08", "Camera09", "Camera010"];

/**
 * Ϊҳ�����co�ļ��ṩ����֧�֣���װ����
 */
function getCult3dCO(fileName) {

	if (fileName.indexOf('/') != -1) 
		fileName = fileName.substring(fileName.lastIndexOf('/') + 1);
	document.getElementById("cult_co").innerHTML = '<OBJECT ID="CultObject"'
    										+ 'classid="clsid:31B7EB4E-8B4B-11D1-A789-00A0CC6651A8"'
											+ 'codebase="http://www.cult3d.com/download/cult.cab#version=5,3,0,212"'
    										+ 'width=1100 height=640>'
    										+ '<PARAM NAME="SRC" VALUE="resources/' + fileName + '">'
    										+ '<EMBED NAME="CultEmbed" ID="CultEmbed"'
       										+ 'PLUGINSPAGE="http://www.cult3d.com/newuser/index.html"'
       										+ 'TYPE="application/x-cult3d-object"'
      										+ 'SRC="resources/' + fileName + '"WIDTH="1100" HEIGHT="640"'
       										+ 'onLoadFinished="enableWrite(' + 'CultEmbed' + ');">'
     										+ '</EMBED>'
  											+ '</OBJECT>';
}

/**
 * ��꾭��ʱ���¼�������������ť
 */
function mouseChange(mouse, img) {
	document.getElementById(mouse).src = "../" + img;
}

/**
 * cult3d ��ʼ��
 */
function enableWrite(refObject){
	Cult3D = new Cult3D_Object(refObject);
	if (typeof(Cult3D) != "object")	{
		alert("Nothing found");
		return;
	}
}

/**
 * ��ť�����¼�
 */
function writeText(cameraId){
	var strSRC = ""
	if(cameraId == 0) {
		strSRC = document.getElementById("sound").src;
		if(strSRC.substring(strSRC.lastIndexOf('/') + 1) == "b01.gif") {
			document.getElementById("sound").src = "../images_cult3d/d01.gif";
		}
		if(strSRC.substring(strSRC.lastIndexOf('/') + 1) == "d01.gif") {;
			document.getElementById("sound").src = "../images_cult3d/b01.gif";
		}
	}

	var cameraVale = cameras[cameraId];

	if (Cult3D && !Cult3D.triggerAction("startWorld",cameraVale))
		alert("startWorld not found!");
}

//������ť����꾭���¼�
function mouseOverSound() {
	strSRC = document.getElementById("sound").src;
	if(strSRC.substring(strSRC.lastIndexOf('/') + 1) == "a01.gif") {
		document.getElementById("sound").src = "../images_cult3d/d01.gif";
	}
	if(strSRC.substring(strSRC.lastIndexOf('/') + 1) == "c01.gif") {
		document.getElementById("sound").src = "../images_cult3d/b01.gif";
	}
}

//������ť������ƿ��¼�
function mouseOutSound() {
	strSRC = document.getElementById("sound").src;
	if(strSRC.substring(strSRC.lastIndexOf('/') + 1) == "b01.gif") {
		document.getElementById("sound").src = "../images_cult3d/c01.gif";
	}
	if(strSRC.substring(strSRC.lastIndexOf('/') + 1) == "d01.gif") {
		document.getElementById("sound").src = "../images_cult3d/a01.gif";
	}
}