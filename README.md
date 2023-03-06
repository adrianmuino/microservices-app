# microservices-app
 Sample microservices architecture using Docker and Kubernetes.

## Setup environment

* [Install Docker](https://docs.docker.com/get-docker/)


* [Install Kubernetes](https://minikube.sigs.k8s.io/docs/start/)

* [Install Kubernetes ingress-nginx](https://kubernetes.github.io/ingress-nginx/deploy/)
```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.6.4/deploy/static/provider/cloud/deploy.yaml
```

* [Install Skaffold](https://skaffold.dev/docs/install/)

### Customize hosts file
Customize your local hosts file to point homerun-app.dev to your localhost IP address.

__Windows__: c:\Windows\System32\Drivers\etc\hosts

__macOS and Linux__: /etc/hosts

Open your hosts file and add the following line at the bottom: `127.0.0.1 homerun-app.dev`

## Run in dev mode
```bash
scaffold dev
```

## Troubleshooting
If app does not function properly when running `skaffold` then follow the steps below:

### Prepare HomeRun service Docker image
```bash
cd HomeRun-Service
docker build -t homerun:v0.0.1 .
```

### Deploy HomeRun service using K8s
```bash
cd config/k8s
kubectl apply -f homerun-mongo-depl.yaml
kubectl apply -f homerun-depl.yaml
```

### Prepare Stats service Docker image
```bash
cd Stats-Service
docker build -t stats:v0.0.1 .
```

### Deploy Stats service using K8s
```bash
cd config/k8s
kubectl apply -f stats-mongo-depl.yaml
kubectl apply -f stats-depl.yaml
```

### Prepare Query service Docker image
```bash
cd Query-Service
docker build -t query:v0.0.1 .
```

### Deploy Query service using K8s
```bash
cd config/k8s
kubectl apply -f query-mongo-depl.yaml
kubectl apply -f query-depl.yaml
```

### Deploy RabbitMQ service using K8s
```bash
cd config/k8s
kubectl apply -f rabbitmq-statefulset.yaml
```

### Prepare FrontEnd service Docker image
```bash
cd front-end
docker build -t front-end:v0.0.1 .
```

### Deploy FrontEnd service using K8s
```bash
cd config/k8s
kubectl apply -f front-end-depl.yaml
```

### Deploy Ingress-Nginx service using K8s
```bash
cd config/k8s
kubectl apply -f ingress-service.yaml
```

## Verify K8s pods and services
```bash
kubectl get pods
kubectl get services
kubectl get deployments
kubectl get statefulsets
```
