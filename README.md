# microservices-app
 Sample microservices architecture using Docker and Kubernetes.

## Prepare HomeRun service Docker image
```bash
cd HomeRun-Service
docker build -t homerun:v0.0.1 .
```

## Deploy HomeRun service using K8s
```bash
cd config/k8s
kubectl apply -f homerun-mongo-depl.yaml
kubectl apply -f homerun-depl.yaml
```

## Prepare Stats service Docker image
```bash
cd Stats-Service
docker build -t stats:v0.0.1 .
```

## Deploy Stats service using K8s
```bash
cd config/k8s
kubectl apply -f stats.yaml
```

## Verify K8s pods and services
```bash
kubectl get pods
kubectl get services
kubectl get deployments
```
