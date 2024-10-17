# WEB103 Project 4 - *Custom Cars*

Submitted by: **Enes Akyuz**

About this web app: An app that lets you create, edit, delete, name and customize your cars. Fully supported with option limitations when incompatible parts are chosen, and with error handling in the case of invalid part submissions. With seperate edit, view, details and create pages.

Time spent: 11 hours

## Required Features

The following **required** functionality is completed:

<!-- Make sure to check off completed functionality below -->

- [X] **The web app is connected to a PostgreSQL database, with an appropriately structured `CustomCar` table**
  - [X] **NOTE: Your GIF must include a view of your Railway database that shows the contents of the table used by your app**
- [X] **The web app uses React to display data from the API**
- [X] **Users can view a list of options they can select for different aspects of a `CustomCar`**
- [X] **On selecting each option, the displayed visual icon for the `CustomCar` updates to match the option the user chose**
- [X] **The user can submit their choices to save the car to the list of created `CustomCar`**
- [X] **If a user submits a feature combo that is impossible, they should receive an appropriate error message and the item should not be saved to the database**
- [X] **The app displays the total price of all features**
- [X] **Users can view a list of all submitted `CustomCar`**
- [X] **Users can edit or delete a submitted `CustomCar` from the list view of submitted `CustomCar`**
- [X] **Users can update or delete `CustomCar` that have been created from the detail page**

The following **optional** features are implemented:

- [X] Selecting particular options prevents incompatible options from being selected even before form submission

The following **additional** features are implemented:

- [X] For the customizations menu, I created state handlers so that the borders of the already selected options looked different. Giving the users a more seamless experience.
- [X] I also changed the icons for the choices, which is based on the selection option to be different in colors for better distinguishability.
- [X] Created a scrollable customization modal pop-up so that if more options get added, we do not have to change the styling.

## Video Walkthrough

Here's a walkthrough of implemented required features:

https://github.com/user-attachments/assets/eedcbb56-a3c2-4f29-83dc-dfcfcd9b6642

GIF created with Kap

## Railway Screenshots

<img width="888" alt="Screenshot 2024-10-17 at 2 40 12 AM" src="https://github.com/user-attachments/assets/429a9c0f-b331-44fc-8c40-e57cc17e44ab">

<img width="893" alt="Screenshot 2024-10-17 at 2 40 06 AM" src="https://github.com/user-attachments/assets/fdd51ba4-4ff1-4175-a8f9-eff969e04d0a">

<img width="895" alt="Screenshot 2024-10-17 at 2 40 59 AM" src="https://github.com/user-attachments/assets/4d94227f-057a-4ef7-884b-6a7c40669aa4">

## Notes

Implementing the options clashing part required a lot of thinking on the database side. I finally found a bit of a hacky solution where I had is_convertible_only and is_non_convertible_only columns so that I could display roofs and items that were compatible with certain types. Other than this, another issue was dealing with the datatypes since for some reason, I needed to constantly cast stuff I received from Railway to integers. Especially in the total money calculation it created a big mess. But overall, I implemented all features including the stretch one.

## License

Copyright 2024, Enes Akyuz
