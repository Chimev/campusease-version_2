interface Institution<T extends object>  {
    type: string;
    institution: T[]
}

interface institutions {
    school: string;
    campus: string[];

}

export const ListOfInstitutions : Institution<institutions>[] =  [
    {
        type: 'State',
        institution: [
            {    
                school: 'EBSU',
                campus: [
                    "CAS",
                    "ISHIEKE",
                    "PERMSITE",
                    "PRESCO",
                    "UGWU ACHARA"
                ]
            },
            {
                school: 'ESUT',
                campus: [
                    "Agbani",
                    "Parklane",
                ]
            },
            {
                school: 'LASU',
                campus: [
                    "Epe" ,
                    "Ikeja",
                    "Ojo",
                ]
            },
        ]
    },
    {
        type: 'Federal',
        institution: [
            {
                school: 'FUNAI',
                campus: [
                    "Area 4",
                    "Area 5",
                    "Area 6"
                ]
            },
            {
                school: 'UNILAG',
                campus: [
                    "Idiaraba",
                    "Radiography",
                    "Akoko Yaba"
                ]
            },
            {
                school: 'UNIPORT',
                campus: [
                    "Abuja",
                    "CHOBA",
                    "DELTA"
                ]
            },
            {
                school: 'UNICAL',
                campus: [
                    "MAIN CAMPUS"
                ]
            },
            {
                school: 'UNIZIK',
                campus: [
                    "Awka",
                    "NNEWI"
                ]
            },
            {
                school: 'UNN',
                campus: [
                    "NSUkKA",
                    "UNAC",
                    "UNEC",
                    "UNTH"
                ]
            }
        ]
    },
    {
        type: 'Polytechnic',
        institution: [
            {
                school: 'IMT',
                campus: [
                    "CAMPUS 1",
                    "CAMPUS 2",
                    "CAMPUS 3",
                    "CAMPUS 4"
                ]
            },
            {
                school: 'YABATECH',
                campus: [
                    "Epe",
                    "Yaba"
                ]
            },
        ]
    }
]