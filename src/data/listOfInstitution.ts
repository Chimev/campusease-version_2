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
                    "Area 1",
                    "Area 2",
                    "Area 3"
                ]
            },
            {
                school: 'Lasu',
                campus: [
                    "Area 4",
                    "Area 5",
                    "Area 6"
                ]
            },
            {
                school: 'Esut',
                campus: [
                    "Area 7",
                    "Area 8",
                    "Area 9"
                ]
            }
        ]
    },
    {
        type: 'Fedeeral',
        institution: [
            {
                school: 'unilag',
                campus: [
                    "Area 1",
                    "Area 2",
                    "Area 3"
                ]
            },
            {
                school: 'funai',
                campus: [
                    "Area 4",
                    "Area 5",
                    "Area 6"
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
                school: 'Yabatech',
                campus: [
                    "Area 1",
                    "Area 2",
                    "Area 3"
                ]
            },
            {
                school: 'Futo',
                campus: [
                    "Area 4",
                    "Area 5",
                    "Area 6"
                ]
            },
            {
                school: 'OKO',
                campus: [
                    "Area 7",
                    "Area 8",
                    "Area 9"
                ]
            }
        ]
    }
]