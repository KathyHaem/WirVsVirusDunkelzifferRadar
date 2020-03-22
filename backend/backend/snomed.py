""" Module containing functions to map our keys to snomed keys and vice versa. """

def from_snomed(snomed_code):
    """
    Returns key for given snomed code.

    Args:
        key (str): snomed code.

    Returns:
        str: key.
    """
    return {
        "406543005": "entry_date",
        "118522005": "uuid",
        "263495000": "gender",
        "397669002": "age",
        "184102003": "zip_code",
        "49727002": "cough",
        "11833006": "cough_dry",
        "28743005": "cough_productive",
        "247410004": "cough_painful",
        "386661006": "fever",
        "103001002": "fever_suspected",
        "82272006": "nose_affected",
        "22253000": "pain",
        "25064002": "pain_head",
        "102482005": "pain_limbs",
        "386617003": "diarrhea",
        "267102003": "throat",
        "267036007": "dyspnea",
        "84229001": "fatigue",
        "121973000": "corona_test",
        "186747009": "corona_positive",
        "432213005": "corona_date",
        "248152002": "female",
        "248153007": "male",
        "772004004": "diverse"
    }[snomed_code]


def to_snomed(key):
    """
    Returns snomed code for given key.

    Args:
        key (str): key.

    Returns:
        str: snomed code.
    """
    return {'entry_date': '406543005',
            'uuid': '118522005',
            'gender': '263495000',
            'age': '397669002',
            'zip_code': '184102003',
            'cough': '49727002',
            'cough_dry': '11833006',
            'cough_productive': '28743005',
            'cough_painful': '247410004',
            'fever': '386661006',
            'fever_suspected': '103001002',
            'nose_affected': '82272006',
            'pain': '22253000',
            'pain_head': '25064002',
            'pain_limbs': '102482005',
            'diarrhea': '386617003',
            'throat': '267102003',
            'dyspnea': '267036007',
            'fatigue': '84229001',
            'corona_test': '121973000',
            'corona_positive': '186747009',
            'corona_date': '432213005',
            'female': '248152002',
            'male': '248153007',
            'diverse': '772004004'
        }[key]

