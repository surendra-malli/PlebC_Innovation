export const patientsData = [
  {
    id: 1,
    name: "Patient 1",
    contact: "+91 7355101587",
    parent: "Jane Doe",
    immediateActions: [
      "Vaccine 1 overdue",
      "Followup pending",
      "lab report pending"
    ],
    actions: [
      "Schedule MMR vaccine",
      "Book follow-up appointment",
      "Complete blood work"
    ],
    dueDates: [
      "1/1/2020",
      "1/1/2020",
      "1/1/2020"
    ],
    details: {
      age: "5 years",
      bloodGroup: "A+",
      allergies: "None",
      lastVisit: "2023-12-20"
    }
  },
  {
    id: 2,
    name: "Patient 2",
    contact: "+91 8855101234",
    parent: "John Smith",
    immediateActions: [
      "Vaccine 2 due",
      "Annual checkup",
      "Blood test pending"
    ],
    actions: [
      "Schedule DPT vaccine",
      "Schedule annual checkup",
      "Book blood test"
    ],
    dueDates: [
      "2/1/2020",
      "2/1/2020",
      "2/1/2020"
    ],
    details: {
      age: "3 years",
      bloodGroup: "B+",
      allergies: "Peanuts",
      lastVisit: "2023-12-15"
    }
  }
];