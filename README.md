Hexon Data - Location Management Application 
=============================================

This is a full-stack web application for managing and visualizing location data on interactive maps. The application allows users to add locations manually or upload them via ZIP files containing location data fileUpload.

Features 
---------

### Core Functionality 

*   **Interactive Map Visualization**: View locations on an interactive map using Leaflet/OpenStreetMap 
    
*   **Manual Location Entry**: Add locations by entering name, longitude, and latitude coordinates
    
*   **File Upload**: Upload ZIP files containing text files with location data in CSV format 
    
*   **User Authentication**: Login and registration system with JWT token-based authentication 
    

### Technical Features 

*   **Real-time Map Updates**: Map automatically recenters when new locations are added 
    
*   **File Format Support**: Accepts ZIP files containing single text files with location data in name,longitude,latitude format 
    
*   **Data Validation**: Server-side validation for coordinate ranges and file formats 
    

Installation 
-------------

### Prerequisites 

*   Node.js (version 14 or higher)
    
*   npm or yarn package manager
    

### Backend Setup 
```
1.  cd Server
    
2.  npm install
    
3.  nodemon server
    
```

### Frontend Setup 
```

1.  cd Client
    
2.  npm install
    
3.  npm run dev
```
    

Usage 
------

### Getting Started 

1.  **Register/Login**: Create an account or login to access the application 
    
2.  **Navigate**: Use the sidebar to switch between Map view and File Upload functionality
    

### Adding Locations Manually 

1.  Go to the Map page
    
2.  Use the form at the top to enter location details
    
    *   Location name
        
    *   Longitude (-180 to 180)
        
    *   Latitude (-90 to 90)
        
3.  Click "Add" to place the marker on the map 
    

### Uploading Location Files 

1.  Go to the Upload page
    
2.  Prepare a ZIP file containing a single text file with location data 
    
3.  Format the text file as CSV: name,longitude,latitude (one location per line) 
    
4.  Select and upload the ZIP file

### File Format Example 

```
Location Name,Longitude,Latitude  
New York,-74.006,40.7128  
London,-0.1276,51.5074
```


API Endpoints 
--------------

The server provides several API endpoints :
```
/api/newUser - User registration
/api/existingUser - User authentication
/api/location - Location management and file upload
```
