$(document).ready(function(){
	var height = $(window).height();
	$(".fittoheight").css("height", height);
});

$("button").bind('click', function(event){submitComment()})

$('li a[href*="more"]').bind('click', function(event){
	console.log('trigger');
	getCommentsAsync();
});


var photoArray = ["EPSON001.jpg","EPSON003.jpg","EPSON019.jpg","EPSON033.jpg","EPSON041.jpg","EPSON045.jpg","EPSON059.jpg","EPSON120.jpg" ,"Baby Mark.jpg", "BigChristmasTree.jpg", "DickWedding.jpg", "DrumCorps.jpg", "FullSizeRender.jpg	", "lasVegas.jpg", "NancyWed.jpg", "RoseParade.jpg", "with Lems.jpg", "EPSON002.jpg", "EPSON009.jpg", "EPSON011.jpg", "EPSON017.jpg", "EPSON036.jpg", "EPSON038.jpg", "EPSON052.jpg", "EPSON132.jpg"];
$('li a[href*="celebrate"]').bind('click', function(event){
	$("#photogallery").html("");
	$.each(photoArray, function(i,e){
		var individualImageString = "";
		individualImageString+='<li class="imgli col-lg-2 col-md-2 col-sm-3 col-xs-4" data-toggle="modal" data-target="#photomodal" >';
    	individualImageString+='<img class="img-responsive" src="/images/gallery/'+e+'">';
  		individualImageString+='</li>';
  		$("#photogallery").append(individualImageString);
	});

	$("#photogallery li").bind('click', function(event){
		$("#photomodal img").attr("src", event.target.src);
	});
});

function getCommentsAsync(){
		console.log('trigger');

	   $.ajax({
		    url: "http://ec2-54-149-119-45.us-west-2.compute.amazonaws.com:3000/comment/get?callback=paintComments",
		    type: 'GET',
		    dataType: 'jsonp',
		    cache: false,
		    jsonp: 'paintComments',
		    success: function(data){
		    	console.log(data);
		    },
		   	error: function (x, t, r) { 
		   		// alert(x.response.message); 
		   	}
		});
	}

function paintComments(commentObj){
	console.log('a');
	if(commentObj != null){
		var outputString = "";
		$.each(commentObj, function(i,e){
			outputString+="<div class='commentunit' id='"+e.id+"'>";
			outputString+="<span style='vertical-align:top; float:left;font-weight:bold'>"+e.submitter+": </span>";
			outputString+="<span>  </span> <br/> <span style='text-align:justified;vertical-align:bottom; float:right'>"+e.content+" </span><br/>";
			outputString+="</div>";


		});
	}
	var existingHTML = $("#commentpane").html();
	existingHTML = outputString+existingHTML;
	$("#commentpane").html(existingHTML);
	$("#name").val('');
	$("#message").val('');
}	

function submitComment(){
	var who = "";
	var what = "";
	who = $("#name").val();
	what = $("#message").val();
	if(who != "" && what != "" && who != null && what != null){
		 $.ajax({
		    url: "http://ec2-54-149-119-45.us-west-2.compute.amazonaws.com:3000/comment/submit/"+who+"/"+what+"?callback=paintComments",
		    type: 'GET',
		    dataType: 'jsonp',
		    cache: false,
		    jsonp: 'paintComments',
		    success: function(data){
		    	console.log(data);
		    },
		   	error: function (x, t, r) {	}
		});
	} else {
		console.log("Not a valid comment");
	}

}


