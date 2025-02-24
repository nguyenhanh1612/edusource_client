//PAGE: Customer create a new hiring post asking for edu resource











































//DUMMY DATA FOR Category Requirement - Image


const categoryImageMap: Record<string, string> = {
    "Adventure": "https://source.unsplash.com/150x150/?adventure",
    "Mystery": "https://source.unsplash.com/150x150/?mystery,detective",
    "Fantasy": "https://source.unsplash.com/150x150/?fantasy,magic",
    "Historical": "https://source.unsplash.com/150x150/?history,ancient",
    "Romance": "https://source.unsplash.com/150x150/?romance,couple",
    "Science Fiction": "https://source.unsplash.com/150x150/?sci-fi,technology",
    "Horror": "https://source.unsplash.com/150x150/?horror,scary",
    "Comedy": "https://source.unsplash.com/150x150/?comedy,funny",
    "Drama": "https://source.unsplash.com/150x150/?drama,emotions",
    "Thriller": "https://source.unsplash.com/150x150/?thriller,dark"
};

//DUMMY DATA FOR Book - Image

const bookImgMap: Record<string, string> = {
    "English 1": "https://source.unsplash.com/150x150/?abc,alphabet",
    "Math 1": "https://source.unsplash.com/150x150/?math,numbers",
    "Science 1": "https://source.unsplash.com/150x150/?science,laboratory",

    "English 2": "https://source.unsplash.com/150x150/?reading,book",
    "Math 2": "https://source.unsplash.com/150x150/?geometry,numbers",
    "Science 2": "https://source.unsplash.com/150x150/?nature,biology",

    "English 3": "https://source.unsplash.com/150x150/?literature,story",
    "Math 3": "https://source.unsplash.com/150x150/?math,equations",
    "Science 3": "https://source.unsplash.com/150x150/?experiments,chemistry",

    "English 4": "https://source.unsplash.com/150x150/?writing,notebook",
    "Math 4": "https://source.unsplash.com/150x150/?fractions,charts",
    "Science 4": "https://source.unsplash.com/150x150/?earth,geology",

    "English 5": "https://source.unsplash.com/150x150/?novel,literature",
    "Math 5": "https://source.unsplash.com/150x150/?math,graph",
    "Science 5": "https://source.unsplash.com/150x150/?ecology,environment",

    "English 6": "https://source.unsplash.com/150x150/?writing,pen",
    "Math 6": "https://source.unsplash.com/150x150/?calculus,formulas",
    "Science 6": "https://source.unsplash.com/150x150/?microscope,biology",

    "English 7": "https://source.unsplash.com/150x150/?poetry,essays",
    "Math 7": "https://source.unsplash.com/150x150/?geometry,shapes",
    "Science 7": "https://source.unsplash.com/150x150/?physics,magnets",

    "English 8": "https://source.unsplash.com/150x150/?grammar,dictionary",
    "Math 8": "https://source.unsplash.com/150x150/?algebra,math",
    "Science 8": "https://source.unsplash.com/150x150/?solar-system,astronomy",

    "English 9": "https://source.unsplash.com/150x150/?literature,books",
    "Math 9": "https://source.unsplash.com/150x150/?calculus,math",
    "Science 9": "https://source.unsplash.com/150x150/?chemistry,experiment",

    "English 10": "https://source.unsplash.com/150x150/?writing,desk",
    "Math 10": "https://source.unsplash.com/150x150/?trigonometry,math",
    "Science 10": "https://source.unsplash.com/150x150/?biology,dna",

    "English 11": "https://source.unsplash.com/150x150/?novel,writing",
    "Math 11": "https://source.unsplash.com/150x150/?math,statistics",
    "Science 11": "https://source.unsplash.com/150x150/?chemistry,laboratory",

    "English 12": "https://source.unsplash.com/150x150/?literature,reading",
    "Math 12": "https://source.unsplash.com/150x150/?math,logic",
    "Science 12": "https://source.unsplash.com/150x150/?science,physics"
};

