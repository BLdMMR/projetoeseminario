# Installation

## Backend
First you have to build the backend app with ``gradle``: ``gradle build``
Than you can run the ``uber-jar`` generated by ``gradle`` located in ``build\libs\Cri_Art.jar`` by executing the following command: ``java -jar build\libs\Cri_Art.jar``

Or you can containerize it in a ``docker image``: ``docker build -t cri_art_backend .``

And run it with ``docker``: ``docker run -p 8080:8080 cri_art_backend``

## Frontend
You can run the application by using ``npm``: ``npm start``

Or you can containerize it in a ``docker image``: ``docker build -t cri_art_frontend .``

And run it with ``docker``: ``docker run -p 3000:3000 cri_art_frontend``
