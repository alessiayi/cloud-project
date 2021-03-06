# Proyecto de Cloud Computing
## Funcionalidad

La propuesta consiste en una aplicación de mensajería online. Incluiría las secciones de:
* Registro
* Inicio de sesión
* Chat: Envío de mensajes (solo texto) y conversaciones 1 a 1

## Arquitectura
![image](https://user-images.githubusercontent.com/33611986/123567576-1901bb00-d788-11eb-8880-49774106d708.png)

## ¿Por qué  escogió  esa  aplicación?
Es un proyecto que se está proponiendo para otro curso y nos pareció adecuado para aplicar los conceptos aprendidos de Cloud Computing. Además, al ser una aplicación de mensajería, nos gustaría desplegarlo en la nube para acceder a la aplicación desde cualquier lugar y hacerlo escalable.
## ¿Qué  características  de  la  computación  en  nube pueden ser integradas en la aplicación?
* Múltiples containers
  * Container para la base de datos
  * Container para el fontend
  * Container para el backend
* Kubernetes: Orquestrador, monitoreo de la infraestructura y escalabilidad con load balancing
* Deployment de kubernetes en google cloud
* Almacenamiento de mensajes en PostgreSQL
* Testear tolerancia a fallos y escalabilidad (enviar múltiples mensajes en un corto tiempo)
  * Auto escalar luego de recibir cierta cantidad de mensajes

## Pasos necesarios para su ejecución.
1. Crear interfaz (frontend) en React para el inicio de sesión, registro y chat.
2. Diseñar y crear base de datos en PostgreSQL para almacenar los mensajes.
3. Crear el servidor en Flask:<br/>
    3.1. Conectar con base de datos<br/>
    3.2. Exponer REST API al frontend<br/>
4. Migrar servidor y base de datos a containers.
5. Manejar containers con Kubernetes.
6. Crear script para enviar múltiples mensajes y testear escalabilidad y tolerancia a fallos.
7. Monitorear infraestructura mientras se ejecuta el script para ver resultados.

## Google Cloud.
#### Creación del cluster en google cloud
![](images/cluster.png)

#### Imagenes de docker del frontend y el backend
![](images/images.png)

#### Deplyments del frontend, el backend y base de datos cada uno con 3 pods
![](images/deployment.png)

#### Pruebas de autoscaling
Se configuró el un evento de autoscaling con un límite de CPU usage > 1% (se eligió este porcentaje para poder probarlo sin mucho esfuerzo computacional).
![](images/autoscaling-setup.png)

El deployment comienza con 1 pod.
![](images/autoscaling/onepod.png)

Se utilizó [este](https://github.com/mildsunrise/curl-benchmark) script de Python para realizar requests al deployment `duck-front` (frontend) y forzar un incremento del CPU usage.
![](images/autoscaling/script.png)

Mientras se ejecutaba el script, se monitoreó la aplicación con Google Cloud Metrics Explorer.
![](images/autoscaling/metrics.png)

Cuando se excedió el límite, se aumentó la cantidad de pods. La siguiente imagen muestra el momento en que incrementaban.
![](images/autoscaling/inprogress.png)

Luego de unos segundos, los pods están listos. Se ha aumentado uno (2 pods en total).
![](images/autoscaling/completed.png)

El evento de scaling quedó registrado en la sección de eventos del deployment.
![](images/autoscaling/event.png)

#### Arquitectura
![](images/Arqui.png)

## Yaml.
En la [carpeta yaml](/yaml) se encontraran los archivos .yaml que se utilizaron para la creación y levantamiento del cluster

## Referencias.
* The  NIST  Definition  of  Cloud  Computing.  Author(s)  Peter  Mell  (NIST),  Tim Grance (NIST). September 2011.
* Distributed  and  Cloud  Computing  From  Parallel  Processing  to  the  Internet  of Things. Kai Hwang, Geoffrey C. Fox,  Jack J. Dongarra.
* Cloud Computing Theory and Practice, Second Edition. Dan C. Marinescu.
* Kubernetes. Kubernetes Documentation. Disponible en https://kubernetes.io/docs/home/
