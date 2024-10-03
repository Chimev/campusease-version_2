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
                school: 'Ebsu',
                campus: [
                    "CAS",
                    "ISHIEKE",
                    "PRESCO",
                    "UGWU ACHARA"
                ]
            },
            {
                school: 'Esut',
                campus: [
                    "Agbani",
                    "Parklane",
                ]
            },
            {
                school: 'Lasu',
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
                school: 'UNN',
                campus: [
                    "Area 7",
                    "Area 8",
                    "Area 9"
                ]
            }
        ]
    },
    {
        type: 'Polytechnic',
        institution: [
            {
                school: 'FUTO',
                campus: [
                    "Area 4",
                    "Area 5",
                    "Area 6"
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