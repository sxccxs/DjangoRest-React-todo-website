# ToDo Web App

It's web service for managing tasks and everyday routine.

As a main backend It uses Python [Django](https://www.djangoproject.com/) and [Django Rest Framework](https://www.django-rest-framework.org/) + [djoser](https://github.com/sunscrapers/djoser) and [simple jwt](https://github.com/jazzband/djangorestframework-simplejwt) for authorisation and authentication.

As fronted It uses JavaScript [React](https://reactjs.org/) with [MaterialUI](https://material-ui.com/)

## Instalation

If you want to set up this project on your local machine then:

1. Clone project from git:
   ```git
   git clone https://github.com/sxccxs/DjangoRest-React-todo-website.git
   ```
2. Go to project folder, create python virtual environment, activate it and install requared packages (use backslashes if you are on windows):
   ```bash
   	cd DjangoRest-React-todo-website
   	python -m venv env
   	env/Scripts/activate
   	python -m pip install -r requirements.txt
   ```
3. Then go to frontend folder and install js packages with npm:
   ```bash
   	cd frontend
   	npm install
   ```
4. Then go back to project root directory and fill appropriate variables.\* file with your data (variables.bat if you are on windows and v<span>ariables.</span>sh if on linux):
   ```
   	export SECRET_KEY=""
   	export DATABASE_NAME=
   	export DATABASE_USER=
   	export DATABASE_PASSWORD=
   	export DATABASE_HOST=
   	export DATABASE_PORT=
   	export EMAIL_USER=
   	export EMAIL_PASSWORD=
   	export EMAIL_PORT =
   ```
5. Then activate your env variables:

   Linux:
   ` . ./variables.sh `

   Windows:
   ` variables.bat `

6. Then run django development server from project root directory:
   ```bash
   	python manage.py runserver
   ```
7. Now you can go to <a href="127.0.0.1">127.0.0.1 </a> and check out this web app.
8. If you want to edit js code, you need to go to frontend directory and run webpack with npm:
   ```bash
   	cd frontend
   	npm run dev
   ```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://github.com/sxccxs/DjangoRest-React-todo-website/blob/main/LICENSE)
