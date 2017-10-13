console.log("Sanity Check: JS is working!");
$softwareList = $('#software-list .container');

$(document).ready(function(){
	// Load full list 
	loadSoftwareList();
	$('#software-list').on('click', '.delete', function deleteSoftware(event){
		event.preventDefault();
		console.log($(this).attr('_id'));
		$.ajax({
			method: 'DELETE',
			url: `/api/software/${$(this).attr('_id')}`,
			success: softwareDeleteSuccess,
			error: softwareDeleteError
		})
		loadSoftwareList();
	})

	$('#software-list').on('click', '.update', function updateSoftware(event){
		event.preventDefault();
		let updateId = $(this).attr('_id');
		let updateText = $(`p[_id="${updateId}"]`).text();
		$(`p[_id="${updateId}"]`).replaceWith(`<textarea _id="${updateId}">${updateText}</textarea>`);
		$(`button.delete[_id="${updateId}"]`).after(`<button _id="${updateId}" class="save btn btn-success">Save</button>`);
	})

	$('#software-list').on('click', '.save', function updateSoftwareSave(event){
		let updateId = $(this).attr('_id');
		let updateText = $(`textarea[_id="${updateId}"]`).val();
		console.log(updateText);
		$.ajax({
			method: 'PUT',
			url: `/api/software/${$(this).attr('_id')}`,
			success: softwareUpdateSuccess,
			error: softwareUpdateError
		})
	})

});

//Load full list via ajax comand 
function loadSoftwareList(){
	$('#software-list .container').empty();
	$.ajax({
		method: 'GET',
		url: '/api/software',
		data: 'json',
		success: softwareListSuccess,
		error: softwareListError
	})
}

// Display loaded JSON data in list items on the page. 
function softwareListSuccess(json){
	console.log(json);
	json.data.forEach(function(software,i){
		let html = `
			<li class="row">
				<div class="col-sm-4">
					<img src="${software.icon}" alt="${software.title} icon"/>
				</div>
				<div class="col-sm-8">
					<h2><a href="${software.website}">${software.title}</a></h2>
					<h3>rating: ${software.rating} / ${software.tag}</h3>
					<p _id="${software._id}">${software.description}</p>
					<button _id="${software._id}" class="update btn btn-default">Update</button>
					<button _id="${software._id}" class="delete btn btn-danger">Delete</button>
				</div>
			</li>
		`;
		$('#software-list .container').append(html);
	})

}

function softwareListError(err){
	console.log('no software for you');
}

function softwareDeleteSuccess(json){
	console.log(json);
}
function softwareDeleteError(){
	console.log("Error! Error!");
}

function softwareUpdateSuccess(json){
	console.log(json)
}

function softwareUpdateError(err){
	console.log("no update" )
}
