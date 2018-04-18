window.onload = () => {

    var form = document.querySelector('form[name="anotherForm"]');
    var output = document.getElementById('output');
    
    form.addEventListener('submit', (ev) => {

        var formData = new FormData(form);
        var request = new XMLHttpRequest();
        
        request.open('POST', '/upload2', true);
        request.onload = (reqEvent) => {
            /* I need to find a way to capture the res.write events, not just the .send */
            if (request.status == 200) {
                output.innerHTML = `Passed ${request.response}`;
            } else {
                output.innerHTML = `Failed ${JSON.stringify(reqEvent)}`;
            }
        };


        ev.preventDefault();
        request.send(formData);
    }, false);
};