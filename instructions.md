React Native Giftr App Project
The final project for React Native will be to create an app for collecting Gift Ideas for people.
Illustration source: https://www.figma.com/file/RuVrCz3nre0JA2SK6en9Oe/Stipple-illustrations---Free-illustrations-(Community)?type=design&node-id=1-131&mode=design&t=92WFh9KDbqerbt8g-0 

**Summary and Layout**
All the data for the people and the ideas will need to be held in global state as well as in AsyncStorage. The state and AsyncStorage data will be entirely managed through a Context object. All the functions for reading, updating, inserting, or deleting the people data need to be inside of the Context object.

There will be four screens:
- PeopleScreen - list the name and date of birth of each person from the global state.
- AddPersonScreen - add a new person object with a name, date of birth, and empty ideas array.
- IdeaScreen - list the name and image for each idea belonging to a selected person.
- AddIdeaScreen - add a new idea object inside the ideas array for a selected person.


**Data Structure**
When saving your People and Ideas create objects like the following examples.

A new person would look like this:
[
  {
    id: 'd825796c-4fc1-4879-ad86-048ece61358b',
    name: 'Mr Man',
    dob: '1983-07-22', //optionally this could be a timestamp
    ideas: [],
  },
];

A person with gift ideas would look like this:
[
  {
    id: 'd825796c-4fc1-4879-ad86-048ece61358b',
    name: 'Mr Man',
    dob: '1983-07-22', //optionally this could be a timestamp
    ideas: [
      {
        id: '5853e2de-2bc1-436f-9754-90022d7b24d2',
        text: 'Something Cool',
        img: 'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fgiftr1-d825796c-4fc1-4879-ad86-048ece61358b/Camera/1000eac5-deff-4003-a7e2-3fba0c98c314.jpg',
        width: 500,
        height: 500,
      },
      //more idea objects here...
    ],
  },
  //more people objects here...
];

**Required Features**

*PeopleScreen Features*
The PeopleScreen is the first screen shown when the app loads.

- The data array loaded and shown needs to come from the global Context Provider.
- If the array is empty then a message should be displayed on the screen asking the user to add a first Person.
- When there is data available in the array, each Person should be displayed via a <FlatList>.
- Each item in the FlatList should show a full name plus the month and day from their date of birth.
- The FlatList should be sorted by month first and then day. In other words, the People should be displayed in the order of their birthdays in the year.
- Each item in the FlatList also needs to have an icon that the user can tap to navigate to the IdeaScreen.
- When you navigate from the PeopleScreen to the IdeaScreen you need to pass the id of the person through Route params.
- There needs to be a FAB or nav header link to navigate to the AddPersonScreen.


*AddPersonScreen Features*
The AddPersonScreen will use a TextInput and a DatePicker from https://hosseinshabani.github.io/react-native-modern-datepicker/ (opens new window)to collect the name and date of birth of the person being added.

- You can save the selected date as string or timestamp. See the notes in module 7.1 about doing this.
- Make sure that both the name and dob are provided before you save the person.
- After a successful save, navigate back to the PersonScreen.
- If the save fails, show a Modal about the error instead of navigating back.
- The PersonScreen should show the updated list and include the newly created person after successfully saving.
- There should be a Save and a Cancel button. The Cancel button returns the user to the PersonScreen.
- Use KeyboardAvoidingView around each control in your form.


*IdeaScreen Features*
The IdeaScreen will display a list of all gift ideas for the selected person.

- There should be a heading above the list that indicates which person is associated with the list of gifts.
- Route params are used to get the id of the person.
- There should be a method in the Context object for getting the list of ideas for a specific person based on the person id.
- The list of ideas should be displayed in a FlatList.
- If the list of ideas is empty then display a message about adding an idea.
- There needs to be a FAB or a header link to navigate to the AddIdeaScreen. Remember to pass the person id to the AddIdeaScreen through Route params.
- Each item in the FlatList should have a thumbnail version of the image, the text for the idea, and a delete button.
- Pressing the delete button should call an async function in the Context object to remove the idea from the person and then update the full list.
- Successfully deleting an idea should trigger a reload of the contents because the list of ideas is updated.
- The thumbnail images should be the same aspect ratio as the images that were saved, just smaller.


*AddIdeaScreen Features*
The AddIdeaScreen will use a TextInput and a Camera component to save a name for the gift idea plus take a picture of the idea.

- The images should be saved at an aspect ratio of 2:3. Save this value as a state variable or ref so you can use it later.
- When taking the image from the camera use a value between 50 and 70% of the screen width as the image width. Then calculate the height based on the screen     width percentage times the aspect ratio. These calculated values should be saved in your context object (state and async storage).
- When taking the picture you will first need to get the Camera permissions using the hook or the method.
- When taking the picture use the .getAvailablePictureSizesAsync() method to control the sizes used by the camera. See the notes in module 7.1 about this.
- When returning from this screen to the PersonScreen be sure to navigate and send the person id back through Route params.
- Make sure that both the text and the image values are provided before you save the idea.
- The validation and saving should be done in a function inside the Context object.
- There should be a Save and a Cancel button on the screen.
- The Cancel button will send the user back to the PersonScreen without saving anything. However, you still need to pass the person id back through the Route params.
- Use KeyboardAvoidingView around each control in your form.


*General Features*

- There needs to be a single Stack.Navigator that loads the four screens.
- There needs to be a single Context object that has a Provider in App.js wrapped around the Navigation stack.
- All the functionality for validating and saving data in the Context object needs to be done inside functions that are inside of the Context Provider function and made available through the context hook.
- All errors, confirmations, and warnings should be displayed through a <Modal> component. A good approach would be to create a component file for the Modal.Pass the type and message and buttons and functions to the component to customize the modal. Just import the component on each screen that needs it.
- Every person and every gift need a unique id. You can use the expo-crypto module to generate the id with the randomUUID method.
- Your app should have a custom SplashScreen and Launcher icon. You can use the Figma template from the link in module 5.2 to create these.