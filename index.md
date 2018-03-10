# Ruum REST API

## Overview

The Ruum REST API makes it possible to integrate external systems with Ruum. It provides capabilities such as:

- Create a new ruum with Sections which can contain Text, Tasks and Files.
- Update the Tasks inside an existing ruum.
- Query ruums.

### Base URL

All URLs referenced in this documentation have the following base unless otherwise specified:

[https://api.ruumapp.com/v1/](https://api.ruumapp.com/v1/)

### Naming convention

'Ruum' is used to refer to the application.   
'ruum' is an individual project within Ruum. 

## Creating an Account

In order to consume our REST API you will need an Integration Account. 

In order to get an Integration Account send an email to: team@ruumapp.com.  

## Authentication 

HTTP requests to the API are protected with [HTTP Basic authentication](https://en.wikipedia.org/wiki/Basic_access_authentication).


## API Endpoints

### Create a ruum.

Url: /v1/ruums  
Method: POST  
body: Ruum (see object model definition below)  
Response:  
```
{
    ruumId: string
}
```

### Update a Task inside a ruum.


### Query ruums.

Url: /v1/ruums/:ruumId  
Method: GET  
Response: Ruum (see object model definition below)  


## Object Model 

Typescript definition of the data model the API uses.

Ruum
```
interface IntegrationRuum{
    ruumId: string;
    status?: RuumStatus;
    externalSystemLink: ExternalSystemLink;
    name: string;
    /** A list emails of participants that will be invited to this ruum. */
    participants: string[];
    sections: CanvasSection[];
}

export interface ExternalSystemLink{
    objectId: string;
    objectType: string;
}

export interface CanvasSection{
    id: string;
    title: string;
    /** Should be Task, Paragraph, Attachment or ExternalField */
    content: any[];
}

export interface Paragraph{
    type: 'paragraph';
    text: string;
}

export interface Task{
    id: string;
    type: 'task';
    description: string;
    startDate?: Day,
    dueDate?: Day,
    assignees?: string[],
    status: TaskStatus;
    externalSystemLink?: ExternalSystemLink;
}

export interface File{
    id: string;
    type: 'file';
    fileType: string;
    fileName: string;
    /** base64 enconded content */
    content: string;
}

export interface ExternalField{
    fieldId: string;
    fieldLabel: string;
    fieldValue: string;
    type: 'external_field'
}

```