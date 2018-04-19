window.onload = () => {

    var form = document.querySelector('form[name="anotherForm"]');
    var output = document.getElementById('output');
    
    form.addEventListener('submit', (ev) => {
        var formData = new FormData(form);
        var request = new XMLHttpRequest();
        
        request.open('POST', '/upload2', true);
        // request.onprogress = updateProgress;
        request.upload.onprogress = updateProgress;
        request.onload = (reqEvent) => {
            /* I need to find a way to capture the res.write events, not just the .send */
            if (request.status == 200) {
                // output.innerHTML = `Passed ${request.response}`;
                console.log('PASSED');
            } else {
                // output.innerHTML = `Failed ${JSON.stringify(reqEvent)}`;
                console.log('FAILED');
            }
        };

        function updateProgress(ev) {
            if (ev.lengthComputable) {
                var percentComplete = ev.loaded / ev.total * 100;
                document.getElementById('progressBar').style.width = `${percentComplete}%`;

                // console.log(ev.loaded);
                // console.log(ev.total);
            }
        }

        ev.preventDefault();
        request.send(formData);
    }, false);
};
