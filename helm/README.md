# Installing IDO Workbench

## Install

Run the following command to install via Helm.

```bash
helm install -n sae-workbench . -f ./local.yaml
```

## Update

Run the following to non-destructively update via Helm.

```bash
helm upgrade sae-workbench ./sae-workbench \
    --version=0.1.0 \
    -f ./sae-workbench/helm/values.yaml
```
