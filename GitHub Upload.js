
cfg.Light
cfg.MUI
//Called when application is started.
function OnStart()
{
	//Create a layout with objects vertically centered.
	lay = MUI.CreateLayout( "Linear", "VCenter,FillXY" )

title = MUI.AddText(lay, "GitHub Upload",  0.8, null, "h1, Medium")
title.SetMargins( 0.01, 0.01, 0.01, 0.05 )

token = MUI.AddTextEdit(lay, 0.8, "filled",  "Enter API Token", true)

username = MUI.AddTextEdit(lay, 0.8, "filled",  "Enter Username", true)

repository = MUI.AddTextEdit(lay, 0.8, "filled",  "Enter Repository", true)

fileName = MUI.AddTextEdit(lay, 0.8, "filled",  "Enter File Name", true)

fileContent = MUI.AddTextEdit(lay, 0.8, "filled",  "Enter File Content", true)

upload = MUI.AddButton(lay, "Upload", 0.35, null, "round" )
upload.SetMargins( 0.01, 0.05, 0.01, 0.01 )
upload.SetOnTouch( uploadFile )
	
	result = app.CreateText("..." )
	lay.AddChild(result )
	
	
	//Add layout to app.	
	app.AddLayout( lay )
}

function uploadFile(){
var toKen = token.GetText()
var userName = username.GetText()
var repoSitory = repository.GetText()
var file = fileName.GetText()
var content = fileContent.GetText()

 if(toKen != "" && userName !="" && repoSitory != "" && file != "" && content != ""){
 var url = "https://api.github.com/repos/" + userName + "/" + repoSitory + "/contents/" + file;
 app.HttpRequest("GET", url, null, null, HandleReply)
 
 app.ShowProgress("Loading...")
 } else{
// app.ShowPopup("Please enter valid info")
dl =  MUI.CreateAlert("Please enter valid info",null, "red")
dl.Show()

setTimeout(hideToast, 2000)
 }
 
 function hideToast(){
 dl.Hide()
 }

}

function HandleReply(error, response, status){
result.SetText(response)
app.HideProgress()
}