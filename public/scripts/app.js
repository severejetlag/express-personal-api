console.log("Sanity Check: JS is working!");
$softwareList = $('#software-list .container');

$(document).ready(function(){

	$.ajax({
		method: 'GET',
		url: '/api/software',
		data: 'json',
		success: softwareListSuccess,
		error: softwareListError
	})

// your code

});

function softwareListSuccess(json){
	console.log(json);
	json.data.forEach(function(software,i){
		let html = `
			<li class="row">
				<div class="col-md-4">
					<img src="${software.icon}" alt="${software.title} icon"/>
				</div>
				<div class="col-md-8">
					<h2><a href="${software.website}">${software.title}</a>: ${software.rating}</h2>
					<h3>${software.tag}</h3>
					<p>${software.description}</p>
				</div>
			</li>
		`;
		$('#software-list .container').append(html);
	})
}

function softwareListError(err){
	console.log('no software for you');
}
