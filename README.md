# Resource & Volunteers Management App - Webapp

[![GitHub contributors](https://img.shields.io/github/contributors/code4romania/rvm-client.svg?style=for-the-badge)](https://github.com/code4romania/rvm-client/graphs/contributors) [![GitHub last commit](https://img.shields.io/github/last-commit/code4romania/rvm-client.svg?style=for-the-badge)](https://github.com/code4romania/rvm-client/commits/master) [![License: MPL 2.0](https://img.shields.io/badge/license-MPL%202.0-brightgreen.svg?style=for-the-badge)](https://opensource.org/licenses/MPL-2.0)

Webapp client of the resource and volunteers management app of DSU (Departamentul pentru Situatii de Urgenta)

[See the project live - a clickable prototype](https://www.figma.com/proto/K7Qqywpx1QFVzG1ml2Fa3qsv/Resource-%26-Volunteer-Management-App)

DSU (Departamentul pentru Situatii de Urgenta) needs a digital tool to manage the resources it has at its disposal, their location, as well as the volunteers and NGOs that are registered to offer help during a crisis situation. The aim of this project is to offer a better management solution so that DSU is better prepared for an emergency situation.


[Contributing](#contributing) | [Built with](#built-with) | [Repos and projects](#repos-and-projects) | [Deployment](#deployment) | [Feedback](#feedback) | [License](#license) | [About Code4Ro](#about-code4ro)


## Contributing

This project is built by amazing volunteers and you can be one of them! Here's a list of ways in [which you can contribute to this project](.github/CONTRIBUTING.MD).

You can also list any pending features and planned improvements for the project here.

## Built With

### Programming languages

TypeScript

### Platforms

### Frontend framework

Angular

### Package managers

NPM

### Database technology & provider

## Repos and projects

API: https://github.com/code4romania/rvm-api

## Deployment

The frontend of the RVM application can be run entirely inside a Docker container. The image needs to be built using the `Dockerfile` inside the project. The Docker image will use the `local` environment configuration. The built image will then be ran by the Docker engine.

```
$ docker build -t rvm-client .
$ docker run --name rvm-client -p 80:80 -d rvm-client
```

Navigate to `http://localhost` to access the web application.

## Feedback

* Request a new feature on GitHub.
* Vote for popular feature requests.
* File a bug in GitHub Issues.
* Email us with other feedback contact@code4.ro

## License 

This project is licensed under the MPL 2.0 License - see the [LICENSE](LICENSE) file for details

## About Code4Ro

Started in 2016, Code for Romania is a civic tech NGO, official member of the Code for All network. We have a community of over 500 volunteers (developers, ux/ui, communications, data scientists, graphic designers, devops, it security and more) who work pro-bono for developing digital solutions to solve social problems. #techforsocialgood. If you want to learn more details about our projects [visit our site](https://www.code4.ro/en/) or if you want to talk to one of our staff members, please e-mail us at contact@code4.ro.

Last, but not least, we rely on donations to ensure the infrastructure, logistics and management of our community that is widely spread across 11 timezones, coding for social change to make Romania and the world a better place. If you want to support us, [you can do it here](https://code4.ro/en/donate/).


