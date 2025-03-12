# MinIO Cluster

The **MinIO Cluster** solution by Virtuozzo Application Platform automates creation of a scalable and cost-efficient object storage, which is fully compatible with the Amazon S3 (_Simple Storage Service_). The package utilizes [MinIO](https://www.minio.io/) microstorage architecture to interconnect a number of separate Docker containers to create a reliable cluster.

![MinIO S3 Cluster](images/minio-s3-cluster.png)

Refer to the appropriate [MinIO Cluster article](https://www.virtuozzo.com/company/blog/s3-minio-cloud-storage-cluster-in-containers/) to get a detailed overview of this solution.

## MinIO Cluster Installation

Log into your Virtuozzo Application Platform account and [import](https://www.virtuozzo.com/application-platform-docs/environment-import/) link to the _**manifest.jps**_ file from above.

![MinIO Cluster Installation](images/minio-cluster-installation.png)

> **Note:** Alternatively, you can find this solution within platform [Marketplace](https://www.virtuozzo.com/application-platform-docs/marketplace/) or use the following button to automatically register on one of the [public Platforms](https://www.virtuozzo.com/application-platform-partners/) and immediately initiate MinIO Cluster installation:
> 
> [![Deploy](images/deploy-to-cloud.png)](https://www.virtuozzo.com/install/?manifest=https://raw.githubusercontent.com/jelastic-jps/minio/master/manifest.jps&min-version=4.6)

Within the appeared form, you need to fetch the next data:
* **Number of nodes** - specify the required cluster size by choosing among the predefined options to create 1 (for development), 4, 8 or 16 MinIO nodes - each of them will be handled in a separate container, which are distributed across available hardware servers to gain [high availability](https://www.virtuozzo.com/application-platform-docs/isolated-containers/#high-availability-for-applications)
* **Environment** - type in the preferred name for your MinIO storage cluster (which, together with your platform domain, will constitute an internal environment name)
* **Display Name** - optionally, add an [alias name](https://www.virtuozzo.com/application-platform-docs/environment-aliases/) to be displayed for the environment in the dashboard
* **Region** - select a [hardware set](https://www.virtuozzo.com/application-platform-docs/environment-regions/) for your environment to be hosted (this option is active only if several regions are available)

Click **Install** and in a few minutes your automatically configured storage will be created.

## Working with MinIO Cluster

Immediately after the solution installation, you can start working with your storage cluster:

* _**user-friendly web interface**_ - to manage your MinIO storage directly in browser; the admin panel access URL and credentials are provided via the appropriate email notification

* _**minio client**_ - to work over the dedicated [command line interface](https://www.minio.io/downloads.html#download-client); refer to the [official documentation](https://docs.minio.io/docs/minio-client-complete-guide) for more information on the tool
