export const FORM_TOP_ITEMS = [
    { 
      title: 'Goals',
      camel: 'goals', 
      placeholder: 'I want to pop off' 
    },
    { 
      title: 'Time constraints',
      camel: 'timeConstraints', 
      placeholder: 'I have a part-time job' 
    },
    { 
      title: 'Work style',
      camel: 'workStyle', 
      placeholder: 'Detail-oriented' 
    },
    { 
      title: 'Personality', 
      camel: 'personality',
      placeholder: 'Sexually free!' 
    },
  ];

export const clientUrl = process.env.NODE_ENV == 'production' ? "https://skedge.onrender.com" : "http://localhost:5173";

export const serverUrl = process.env.NODE_ENV == 'production' ? "https://skedge-api.onrender.com" : "http://localhost:8000";