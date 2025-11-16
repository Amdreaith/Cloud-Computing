# Cloud Computing - Lecture 1

**Cloud Computing**>> Delivery of computing services (storage, databases, servers, networking, software, analytics) over the internet. Pay only for what you use, access resources on-demand.

**Simple Example**:
         Google Drive - upload files to servers, access anywhere with internet



## Cloud Service Models (IaaS, PaaS, SaaS)

### 1. Infrastructure as a Service (IaaS)
- **What it provides**? Basic infrastructure (servers, storage, networking)
- **Your control**: Operating system and applications
- **Provider manages**: Hardware
- **Examples**: Amazon EC2, Azure Virtual Machines

### 2. Platform as a Service (PaaS)
- **What it provides**? Platform for building/deploying applications
- **Your control**: Application code
- **Provider manages**: Hardware and OS
- **Examples**: Heroku, Google App Engine, Azure App Service

### 3. Software as a Service (SaaS)
- **What it provides**? Ready-to-use applications
- **Your control**: Just use the software
- **Provider manages**: Everything
- **Examples**: Gmail, Office 365, Dropbox



## Cloud Deployment Types

| Type | Description | Example | Pros/Cons |
|------|-------------|---------|-----------|
| **Public Cloud** | Services over public internet | AWS, Azure, GCP | Most cost-effective, less control |
| **Private Cloud** | Single organization only | On-site or hosted | More security/control, more expensive |
| **Hybrid Cloud** | Public + Private combination | Sensitive data private, other workloads public | Balance of both |



## History Timeline

- **1960s**: John McCarthy suggests computation as public utility
- **1970s-1990s**: Virtualization and distributed computing emerge
- **Late 1990s**: Salesforce introduces SaaS concept
- **2006**: AWS launches (major turning point - businesses can rent instead of own)
- **2010s-Present**: Azure, GCP enter market; cloud becomes essential to modern IT


## Major Cloud Providers

### Amazon Web Services (AWS)
- Market leader
- 200+ services: EC2 (servers), S3 (storage), RDS (databases)

### Microsoft Azure
- Popular with Microsoft users
- Services: Virtual Machines, Azure SQL Database, App Service

### Google Cloud Platform (GCP)
- Strong in data analytics and machine learning
- Services: Compute Engine, BigQuery

**Others**: IBM Cloud, Oracle Cloud, Alibaba Cloud



## Cloud Computing Roles

- **Cloud Developer**: Builds/maintains cloud apps, focuses on coding and service integration
- **Cloud Engineer**: Sets up, manages, monitors infrastructure; ensures smooth operation
- **Cloud Architect**: Designs overall cloud system structure
- **Cloud Solutions Architect**: Designs business-specific solutions using cloud tech
- **Cloud Security Specialist**: Protects systems, ensures data privacy



## Connection to Backend Development

**Backend Development**: Server-side code, databases, application logic (what users don't see)

**Why Cloud Matters for Backend**:
- No need to buy/maintain physical servers
- Rent computing power and storage as needed
- Easy deployment and scaling

**Example Workflow** (Node.js REST API):
1. Write backend code in Node.js
2. Use cloud databases (AWS DynamoDB, Azure CosmosDB, Firebase)
3. Deploy API to cloud for global access

** Insight **: Almost all modern backend development uses cloud platforms for hosting and scaling


## Benefits of Cloud Computing

1. **Cost-effective**: Pay only for what you use
2. **Scalable**: Easily add resources as you grow
3. **Accessible**: Access from anywhere with internet
4. **Managed infrastructure**: Provider handles hardware maintenance
