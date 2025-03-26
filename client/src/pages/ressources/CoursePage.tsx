import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

interface PDFDocument {
  id: string;
  title: string;
  url: string;
  description: string;
}

interface Course {
  id: string;
  name: string;
  code: string;
  url: string;
}

const semester1Courses: Course[] = [
  { 
    id: '1.1', 
    name: 'Architecture des ordinateurs', 
    code: '1.1',
    url: 'https://drive.google.com/drive/folders/1yIJR-VUPfasOJW6NWcrMwKYq2nMQHYYA'
  },
  { 
    id: '1.2', 
    name: 'Système d\'exploitation', 
    code: '1.2',
    url: 'https://drive.google.com/drive/folders/1mTFplxxohLGJjBcqeg3CU0QZWwkKnTtE'
  },
  { 
    id: '2.1', 
    name: 'Algèbre matricielle', 
    code: '2.1',
    url: 'https://drive.google.com/drive/folders/11jxn70rjdcOuqFuG_GPKLpqMjF48sKbA?usp=drive_link'
  },
  { 
    id: '2.2', 
    name: 'Analyse', 
    code: '2.2',
    url: 'https://drive.google.com/drive/folders/1iqc7kgA824dOByKQ1I97b3X7qtKEfWHA?usp=drive_link'
  },
  { 
    id: '3.1', 
    name: 'Algorithmique', 
    code: '3.1',
    url: 'https://drive.google.com/drive/folders/1gW3py3n7I54Jyh_6dYvl2OgqhqQ-tKPV'
  },
  { 
    id: '3.2', 
    name: 'Programmation Python', 
    code: '3.2',
    url: 'https://drive.google.com/drive/folders/1hz35M3rKYuaTRRRpxIv2KLhU6IAfW2cG'
  },
  { 
    id: '4.1', 
    name: 'Gestion électronique des documents', 
    code: '4.1',
    url: 'https://drive.google.com/drive/folders/1e6fn5vLkKVcuDFNXe_6mGjK_4cZlBone'
  },
  { 
    id: '4.2', 
    name: 'Documents structurés', 
    code: '4.2',
    url: 'https://drive.google.com/drive/folders/18McpHw7TPcbI5CGrzSjtK142HvkTR0Na'
  },
  { 
    id: '5.1', 
    name: 'Initiation aux réseaux informatiques', 
    code: '5.1',
    url: 'https://drive.google.com/drive/folders/1E1r3pdwQxJREKP_TGpBZhjLkszmqDu5b'
  },
  { 
    id: '5.2', 
    name: 'Réseaux sans fils et mobiles', 
    code: '5.2',
    url: 'https://drive.google.com/drive/folders/1l-BqfQ6jcyXoZTcOad7rFfJT6quc8_kh'
  },
  { 
    id: '6.1', 
    name: 'Théorie des graphes', 
    code: '6.1',
    url: 'https://drive.google.com/drive/folders/1ecX5_jrMTfWqvGOa3y1zxaKHVBpLiRdB'
  },
  { 
    id: '6.2', 
    name: 'Optimisation', 
    code: '6.2',
    url: ''
  },
  { 
    id: '7.1', 
    name: 'Économie générale', 
    code: '7.1',
    url: 'https://drive.google.com/drive/folders/1vHya_8jdB_uy89_gtpC-MLOCRn4tI6ul'
  },
  { 
    id: '7.2', 
    name: 'Micro et Macro-économie', 
    code: '7.2',
    url: 'https://drive.google.com/drive/folders/1MKeVLCNrVzTxhM-eO1dBaB0dXjrhxsI-'
  },
  { 
    id: '8.1', 
    name: 'Techniques d\'expression et de communication', 
    code: '8.1',
    url: 'https://drive.google.com/drive/folders/1SQgTBTu4VNfodXgm3G0Ghhno7La1YT2g'
  },
  { 
    id: '8.2', 
    name: 'English for General Purposes 1', 
    code: '8.2',
    url: ''
  }
];

const semester2IcsdCourses: Course[] = [
  { 
    id: '1.1-s2-icsd', 
    name: 'Analyse et Conception des SI Relationnels', 
    code: '1.1',
    url: 'https://drive.google.com/drive/folders/1kaSjPtThBl01LcNGNLIxjFBpHP5PSd1L?usp=drive_link'
  },
  { 
    id: '1.2-s2-icsd', 
    name: 'SGBDR – SQL', 
    code: '1.2',
    url: 'https://drive.google.com/drive/folders/1bNM0Ea9pDNd84V6Tv8yzTS5RVs3OvfgG?usp=drive_link'
  },
  { 
    id: '2.1-s2-icsd', 
    name: 'Probabilité', 
    code: '2.1',
    url: 'https://drive.google.com/drive/folders/1cgYjFeFopbnsNipBgOu1oZadE_MZ0H4e?usp=drive_link'
  },
  { 
    id: '2.2-s2-icsd', 
    name: 'Statistique descriptive', 
    code: '2.2',
    url: 'https://drive.google.com/drive/folders/1hyyLQRqY94LZiM3pZmwBH4Zssk9-LlCu?usp=drive_link'
  },
  { 
    id: '3.1-s2-icsd', 
    name: 'Technologies Web', 
    code: '3.1',
    url: 'https://drive.google.com/drive/folders/1L_DiLB_EdEifwHPG-OeTXB5IMwzq1Jqb?usp=drive_link'
  },
  { 
    id: '3.2-s2-icsd', 
    name: 'Programmation web en PHP', 
    code: '3.2',
    url: 'https://drive.google.com/drive/folders/17JdhahmVy0kOK5sf3MkgCQ0FVORltml-?usp=drive_link'
  },
  { 
    id: '4.1-s2-icsd', 
    name: 'Algorithmique avancée', 
    code: '4.1',
    url: 'https://drive.google.com/drive/folders/1GthXzPmzR_ONonkIXjl-x1zM8_3dZ7q7?usp=drive_link'
  },
  { 
    id: '4.2-s2-icsd', 
    name: 'Programmation avancée', 
    code: '4.2',
    url: 'https://drive.google.com/drive/folders/1mGlCF0R2RlXmAa_feY9rygOuWOWl9oIF?usp=drive_link'
  },
  { 
    id: '5.1-s2-icsd', 
    name: 'ECM', 
    code: '5.1',
    url: 'https://drive.google.com/drive/folders/1_novRgRXEiDCq0Ln8OLZdAC6VoGViBGC?usp=drive_link'
  },
  { 
    id: '5.2-s2-icsd', 
    name: 'E-services', 
    code: '5.2',
    url: 'https://drive.google.com/drive/folders/1Tb8ibfF9eQWlwrk63bGvEOp2_LjB50AH?usp=drive_link'
  },
  { 
    id: '6.1-s2-icsd', 
    name: 'Knowledge Management (KM)', 
    code: '6.1',
    url: 'https://drive.google.com/drive/folders/1OLurLPg0ETHGNHZQXc0IWOWIPCexBMQE?usp=drive_link'
  },
  { 
    id: '6.2-s2-icsd', 
    name: 'Veille technologique', 
    code: '6.2',
    url: 'https://drive.google.com/drive/folders/1ptq36QPDaSmpA_N4cepfo7YtAvzl5TOS?usp=drive_link'
  },
  { 
    id: '7.1-s2-icsd', 
    name: 'Management et Marketing', 
    code: '7.1',
    url: 'https://drive.google.com/drive/folders/1UVThlahQWAdoH1kK-GJAgHIkn5I-6_jA?usp=drive_link'
  },
  { 
    id: '7.2-s2-icsd', 
    name: 'Comptabilité générale', 
    code: '7.2',
    url: 'https://drive.google.com/drive/folders/1LWC1DA6dxnmB-Y6BUEalJeu-_2VOxz6R?usp=drive_link'
  },
  { 
    id: '8.1-s2-icsd', 
    name: 'Techniques d\'expression et de communication 2', 
    code: '8.1',
    url: 'https://drive.google.com/drive/folders/1BL5XPgb1GNRxZzIdvxaOccnJilWVgqNq?usp=drive_link'
  },
  { 
    id: '8.2-s2-icsd', 
    name: 'English for General Purposes 2', 
    code: '8.2',
    url: 'https://drive.google.com/drive/folders/14iIt-jnobMjpTJG_d_0i0dmVjvngOYai?usp=drive_link'
  }
];

const semester2IsitdCourses: Course[] = [
  { 
    id: '1.1-s2-isitd', 
    name: 'Analyse et Conception des SI Relationnels', 
    code: '1.1',
    url: 'https://drive.google.com/drive/folders/1kaSjPtThBl01LcNGNLIxjFBpHP5PSd1L?usp=drive_link'
  },
  { 
    id: '1.2-s2-isitd', 
    name: 'SGBDR – SQL', 
    code: '1.2',
    url: 'https://drive.google.com/drive/folders/1bNM0Ea9pDNd84V6Tv8yzTS5RVs3OvfgG?usp=drive_link'
  },
  { 
    id: '2.1-s2-isitd', 
    name: 'Probabilité', 
    code: '2.1',
    url: 'https://drive.google.com/drive/folders/1cgYjFeFopbnsNipBgOu1oZadE_MZ0H4e?usp=drive_link'
  },
  { 
    id: '2.2-s2-isitd', 
    name: 'Statistique descriptive', 
    code: '2.2',
    url: 'https://drive.google.com/drive/folders/1hyyLQRqY94LZiM3pZmwBH4Zssk9-LlCu?usp=drive_link'
  },
  { 
    id: '3.1-s2-isitd', 
    name: 'Technologies Web', 
    code: '3.1',
    url: 'https://drive.google.com/drive/folders/1L_DiLB_EdEifwHPG-OeTXB5IMwzq1Jqb?usp=drive_link'
  },
  { 
    id: '3.2-s2-isitd', 
    name: 'Programmation web en PHP', 
    code: '3.2',
    url: 'https://drive.google.com/drive/folders/17JdhahmVy0kOK5sf3MkgCQ0FVORltml-?usp=drive_link'
  },
  { 
    id: '4.1-s2-isitd', 
    name: 'Algorithmique avancée', 
    code: '4.1',
    url: 'https://drive.google.com/drive/folders/1GthXzPmzR_ONonkIXjl-x1zM8_3dZ7q7?usp=drive_link'
  },
  { 
    id: '4.2-s2-isitd', 
    name: 'Programmation avancée', 
    code: '4.2',
    url: 'https://drive.google.com/drive/folders/1mGlCF0R2RlXmAa_feY9rygOuWOWl9oIF?usp=drive_link'
  },
  { 
    id: '5.1-s2-isitd', 
    name: 'ECM', 
    code: '5.1',
    url: 'https://drive.google.com/drive/folders/1_novRgRXEiDCq0Ln8OLZdAC6VoGViBGC?usp=drive_link'
  },
  { 
    id: '5.2-s2-isitd', 
    name: 'E-services', 
    code: '5.2',
    url: 'https://drive.google.com/drive/folders/1Tb8ibfF9eQWlwrk63bGvEOp2_LjB50AH?usp=drive_link'
  },
  { 
    id: '6.1-s2-isitd', 
    name: 'Knowledge Management (KM)', 
    code: '6.1',
    url: 'https://drive.google.com/drive/folders/1OLurLPg0ETHGNHZQXc0IWOWIPCexBMQE?usp=drive_link'
  },
  { 
    id: '6.2-s2-isitd', 
    name: 'Veille technologique', 
    code: '6.2',
    url: 'https://drive.google.com/drive/folders/1ptq36QPDaSmpA_N4cepfo7YtAvzl5TOS?usp=drive_link'
  },
  { 
    id: '7.1-s2-isitd', 
    name: 'Management et Marketing', 
    code: '7.1',
    url: 'https://drive.google.com/drive/folders/1UVThlahQWAdoH1kK-GJAgHIkn5I-6_jA?usp=drive_link'
  },
  { 
    id: '7.2-s2-isitd', 
    name: 'Comptabilité générale', 
    code: '7.2',
    url: 'https://drive.google.com/drive/folders/1LWC1DA6dxnmB-Y6BUEalJeu-_2VOxz6R?usp=drive_link'
  },
  { 
    id: '8.1-s2-isitd', 
    name: 'Techniques d\'expression et de communication 2', 
    code: '8.1',
    url: 'https://drive.google.com/drive/folders/1BL5XPgb1GNRxZzIdvxaOccnJilWVgqNq?usp=drive_link'
  },
  { 
    id: '8.2-s2-isitd', 
    name: 'English for General Purposes 2', 
    code: '8.2',
    url: 'https://drive.google.com/drive/folders/14iIt-jnobMjpTJG_d_0i0dmVjvngOYai?usp=drive_link'
  }
];

const semester2IssicCourses: Course[] = [
  { 
    id: '1.1-s2-issic', 
    name: 'Analyse et Conception des SI Relationnels', 
    code: '1.1',
    url: 'https://drive.google.com/drive/folders/1kaSjPtThBl01LcNGNLIxjFBpHP5PSd1L?usp=drive_link'
  },
  { 
    id: '1.2-s2-issic', 
    name: 'SGBDR – SQL', 
    code: '1.2',
    url: 'https://drive.google.com/drive/folders/1bNM0Ea9pDNd84V6Tv8yzTS5RVs3OvfgG?usp=drive_link'
  },
  { 
    id: '2.1-s2-issic', 
    name: 'Probabilité', 
    code: '2.1',
    url: 'https://drive.google.com/drive/folders/1cgYjFeFopbnsNipBgOu1oZadE_MZ0H4e?usp=drive_link'
  },
  { 
    id: '2.2-s2-issic', 
    name: 'Statistique descriptive', 
    code: '2.2',
    url: 'https://drive.google.com/drive/folders/1hyyLQRqY94LZiM3pZmwBH4Zssk9-LlCu?usp=drive_link'
  },
  { 
    id: '3.1-s2-issic', 
    name: 'Technologies Web', 
    code: '3.1',
    url: 'https://drive.google.com/drive/folders/1L_DiLB_EdEifwHPG-OeTXB5IMwzq1Jqb?usp=drive_link'
  },
  { 
    id: '3.2-s2-issic', 
    name: 'Programmation web en PHP', 
    code: '3.2',
    url: 'https://drive.google.com/drive/folders/17JdhahmVy0kOK5sf3MkgCQ0FVORltml-?usp=drive_link'
  },
  { 
    id: '4.1-s2-issic', 
    name: 'Algorithmique avancée', 
    code: '4.1',
    url: 'https://drive.google.com/drive/folders/1GthXzPmzR_ONonkIXjl-x1zM8_3dZ7q7?usp=drive_link'
  },
  { 
    id: '4.2-s2-issic', 
    name: 'Programmation avancée', 
    code: '4.2',
    url: 'https://drive.google.com/drive/folders/1mGlCF0R2RlXmAa_feY9rygOuWOWl9oIF?usp=drive_link'
  },
  { 
    id: '5.1-s2-issic', 
    name: 'ECM', 
    code: '5.1',
    url: 'https://drive.google.com/drive/folders/1_novRgRXEiDCq0Ln8OLZdAC6VoGViBGC?usp=drive_link'
  },
  { 
    id: '5.2-s2-issic', 
    name: 'E-services', 
    code: '5.2',
    url: 'https://drive.google.com/drive/folders/1Tb8ibfF9eQWlwrk63bGvEOp2_LjB50AH?usp=drive_link'
  },
  { 
    id: '6.1-s2-issic', 
    name: 'Knowledge Management (KM)', 
    code: '6.1',
    url: 'https://drive.google.com/drive/folders/1OLurLPg0ETHGNHZQXc0IWOWIPCexBMQE?usp=drive_link'
  },
  { 
    id: '6.2-s2-issic', 
    name: 'Veille technologique', 
    code: '6.2',
    url: 'https://drive.google.com/drive/folders/1ptq36QPDaSmpA_N4cepfo7YtAvzl5TOS?usp=drive_link'
  },
  { 
    id: '7.1-s2-issic', 
    name: 'Management et Marketing', 
    code: '7.1',
    url: 'https://drive.google.com/drive/folders/1UVThlahQWAdoH1kK-GJAgHIkn5I-6_jA?usp=drive_link'
  },
  { 
    id: '7.2-s2-issic', 
    name: 'Comptabilité générale', 
    code: '7.2',
    url: 'https://drive.google.com/drive/folders/1LWC1DA6dxnmB-Y6BUEalJeu-_2VOxz6R?usp=drive_link'
  },
  { 
    id: '8.1-s2-issic', 
    name: 'Techniques d\'expression et de communication 2', 
    code: '8.1',
    url: 'https://drive.google.com/drive/folders/1BL5XPgb1GNRxZzIdvxaOccnJilWVgqNq?usp=drive_link'
  },
  { 
    id: '8.2-s2-issic', 
    name: 'English for General Purposes 2', 
    code: '8.2',
    url: 'https://drive.google.com/drive/folders/14iIt-jnobMjpTJG_d_0i0dmVjvngOYai?usp=drive_link'
  }
];

const semester2InnCourses: Course[] = [
  { 
    id: '1.1-s2-inn', 
    name: 'Algorithmique avancé', 
    code: '1.1',
    url: 'https://drive.google.com/drive/folders/16-Ac1yx-KBajKMeBfNjzgofdfQge3hM6'
  },
  { 
    id: '1.2-s2-inn', 
    name: 'Analyse et Conception des SI Relationnels', 
    code: '1.2',
    url: 'https://drive.google.com/drive/folders/16-Ac1yx-KBajKMeBfNjzgofdfQge3hM6'
  },
  { 
    id: '2.1-s2-inn', 
    name: 'Comptabilité', 
    code: '2.1',
    url: 'https://drive.google.com/drive/folders/16-Ac1yx-KBajKMeBfNjzgofdfQge3hM6'
  },
  { 
    id: '2.2-s2-inn', 
    name: 'E-Services', 
    code: '2.2',
    url: 'https://drive.google.com/drive/folders/16-Ac1yx-KBajKMeBfNjzgofdfQge3hM6'
  },
  { 
    id: '3.1-s2-inn', 
    name: 'ECM', 
    code: '3.1',
    url: 'https://drive.google.com/drive/folders/16-Ac1yx-KBajKMeBfNjzgofdfQge3hM6'
  },
  { 
    id: '3.2-s2-inn', 
    name: 'Knowledge managment', 
    code: '3.2',
    url: 'https://drive.google.com/drive/folders/16-Ac1yx-KBajKMeBfNjzgofdfQge3hM6'
  },
  { 
    id: '4.1-s2-inn', 
    name: 'Managment te Mareketing', 
    code: '4.1',
    url: 'https://drive.google.com/drive/folders/16-Ac1yx-KBajKMeBfNjzgofdfQge3hM6'
  },
  { 
    id: '4.2-s2-inn', 
    name: 'PHP', 
    code: '4.2',
    url: 'https://drive.google.com/drive/folders/16-Ac1yx-KBajKMeBfNjzgofdfQge3hM6'
  },
  { 
    id: '5.1-s2-inn', 
    name: 'Proba', 
    code: '5.1',
    url: 'https://drive.google.com/drive/folders/16-Ac1yx-KBajKMeBfNjzgofdfQge3hM6'
  },
  { 
    id: '5.2-s2-inn', 
    name: 'Programmation systeme', 
    code: '5.2',
    url: 'https://drive.google.com/drive/folders/16-Ac1yx-KBajKMeBfNjzgofdfQge3hM6'
  },
  { 
    id: '6.1-s2-inn', 
    name: 'SQL', 
    code: '6.1',
    url: 'https://drive.google.com/drive/folders/16-Ac1yx-KBajKMeBfNjzgofdfQge3hM6'
  },
  { 
    id: '6.2-s2-inn', 
    name: 'Statistiques', 
    code: '6.2',
    url: 'https://drive.google.com/drive/folders/16-Ac1yx-KBajKMeBfNjzgofdfQge3hM6'
  },
  { 
    id: '7.1-s2-inn', 
    name: 'TEC', 
    code: '7.1',
    url: 'https://drive.google.com/drive/folders/16-Ac1yx-KBajKMeBfNjzgofdfQge3hM6'
  },
  { 
    id: '7.2-s2-inn', 
    name: 'Tech Web', 
    code: '7.2',
    url: 'https://drive.google.com/drive/folders/16-Ac1yx-KBajKMeBfNjzgofdfQge3hM6'
  },
  { 
    id: '8.1-s2-inn', 
    name: 'Veille technologique', 
    code: '8.1',
    url: 'https://drive.google.com/drive/folders/16-Ac1yx-KBajKMeBfNjzgofdfQge3hM6'
  }
];

const semester3Courses: Course[] = [
  { 
    id: '1.1-s3', 
    name: 'Culture entrepreneuriale', 
    code: '1.1',
    url: 'https://drive.google.com/drive/folders/1oXlZsREZLsoPmSCt8rpEnEP3fe2htkpU?usp=drive_link'
  },
  { 
    id: '1.2-s3', 
    name: 'Project Management', 
    code: '1.2',
    url: 'https://drive.google.com/drive/folders/13LFsBp6_e0Xj9Cg4ADSff6q8QoeBJlik?usp=drive_link'
  },
  { 
    id: '2.1-s3', 
    name: 'Data Analysis', 
    code: '2.1',
    url: 'https://drive.google.com/drive/folders/1W-HPJBEWfoJC1yCSCyDaEnol6a79FXk5?usp=drive_link'
  },
  { 
    id: '2.2-s3', 
    name: 'Data Scraping and Acquisition', 
    code: '2.2',
    url: 'https://drive.google.com/drive/folders/1TAl7zCz8V5tucuXudS4Fm5fOkwZhLPnj?usp=drive_link'
  },
  { 
    id: '3.1-s3', 
    name: 'Méthodes d\'Optimisation', 
    code: '3.1',
    url: 'https://drive.google.com/drive/folders/1YxNdOdZcWRP-0BAvUYn19Xb7iZJIMFtS?usp=drive_link'
  },
  { 
    id: '3.2-s3', 
    name: 'Analyse des Graphes (SNA)', 
    code: '3.2',
    url: 'https://drive.google.com/drive/folders/1T9U1UkYcRu4e1qTovcPIiPq9ztEZung2?usp=drive_link'
  },
  { 
    id: '4.1-s3', 
    name: 'Ontologie et Sémantique', 
    code: '4.1',
    url: 'https://drive.google.com/drive/folders/1zwV6g04cEs7MQQ4Pb7qFVw8zZo39_xBe?usp=drive_link'
  },
  { 
    id: '4.2-s3', 
    name: 'Intelligence Artificielle', 
    code: '4.2',
    url: 'https://drive.google.com/drive/folders/1upAztVysx5kIcBRfUBskD3blmTR4KuFh?usp=drive_link'
  },
  { 
    id: '5.1-s3', 
    name: 'Traitement de signal', 
    code: '5.1',
    url: 'https://drive.google.com/drive/folders/1My4-E0kewKzh21NVIcpXMKFnfE84n74G?usp=drive_link'
  },
  { 
    id: '5.2-s3', 
    name: 'Théorie de l\'information', 
    code: '5.2',
    url: 'https://drive.google.com/drive/folders/1Ma4TWG4YpKLxODzc-zgCOW_t1W92M7-m?usp=drive_link'
  },
  { 
    id: '6.1-s3', 
    name: 'Processus Stochastiques', 
    code: '6.1',
    url: 'https://drive.google.com/drive/folders/1aezQ1HP-sfEhQ-SFQR1d9HgxYv4_7qzd?usp=drive_link'
  },
  { 
    id: '6.2-s3', 
    name: 'Statistiques Inférentielles', 
    code: '6.2',
    url: 'https://drive.google.com/drive/folders/1cBqtYAOeDhTA87o-PLtYYqffMsE5D5Ct?usp=drive_link'
  },
  { 
    id: '7.1-s3', 
    name: 'Projet OO', 
    code: '7.1',
    url: 'https://drive.google.com/drive/folders/1qLXhl32SaSJB4P6FsP1_39ty7fqT-Si5?usp=drive_link'
  },
  { 
    id: '7.2-s3', 
    name: 'Java', 
    code: '7.2',
    url: 'https://drive.google.com/drive/folders/1fhgfPQyOYA8ZefJplJBwUUfKT-k1eMqT?usp=drive_link'
  },
  { 
    id: '8.1-s3', 
    name: 'UML', 
    code: '8.1',
    url: 'https://drive.google.com/drive/folders/1BL6O2I7bfmkXxJ15L7Puudl7qUdIVVJh?usp=drive_link'
  },
  { 
    id: '8.2-s3', 
    name: 'Management de projet SI', 
    code: '8.2',
    url: 'https://drive.google.com/drive/folders/1DQFBZYVxOJ48t25W76Xxa-vPSSlnNVMd?usp=drive_link'
  }
];

const semester3IsitdCourses: Course[] = [
  { 
    id: '1.1-s3-isitd', 
    name: 'Administration des BD', 
    code: '1.1',
    url: 'https://drive.google.com/drive/folders/14XiVsyq0-3EU5TgZSTbvkpHSe7zrBVqL?usp=drive_link'
  },
  { 
    id: '1.2-s3-isitd', 
    name: 'Administration des Systèmes d\'exploitation', 
    code: '1.2',
    url: 'https://drive.google.com/drive/folders/1UDRpi_IcIvfMr9LFZLYnXUti2_gjVmEC?usp=drive_link'
  },
  { 
    id: '2.1-s3-isitd', 
    name: 'Administration réseaux et virtualisation', 
    code: '2.1',
    url: 'https://drive.google.com/drive/folders/1eIUJ3eQlEtduHQEwv08_vFoE5aGUomYL?usp=drive_link'
  },
  { 
    id: '2.2-s3-isitd', 
    name: 'Analyse de données', 
    code: '2.2',
    url: 'https://drive.google.com/drive/folders/1G_cOOXz65zDcuWAXw_OcB1fuHUO97RUx?usp=drive_link'
  },
  { 
    id: '3.1-s3-isitd', 
    name: 'Communication Professionnelle', 
    code: '3.1',
    url: 'https://drive.google.com/drive/folders/1xBbT0l6wEshqi51qR-zlGfM69j6FmC7u?usp=drive_link'
  },
  { 
    id: '3.2-s3-isitd', 
    name: 'Fondements de l\'intelligence artificielle', 
    code: '3.2',
    url: 'https://drive.google.com/drive/folders/1U7NI9fGDj7zeirovn0ImVv-ibHum-JKz?usp=drive_link'
  },
  { 
    id: '4.1-s3-isitd', 
    name: 'Inférence statistique', 
    code: '4.1',
    url: 'https://drive.google.com/drive/folders/1so-KFOdlmysR9ZVxlY93QDrpbn8gcGTw?usp=drive_link'
  },
  { 
    id: '4.2-s3-isitd', 
    name: 'Langages pour les sciences de données', 
    code: '4.2',
    url: 'https://drive.google.com/drive/folders/1NHNunQg4a22lyQVmU1VWnsSSHfuOUoq6?usp=drive_link'
  },
  { 
    id: '5.1-s3-isitd', 
    name: 'PL⁄SQL', 
    code: '5.1',
    url: 'https://drive.google.com/drive/folders/1olANwmsMeZGkrDv9joODD6Pdi-wKQMNf?usp=drive_link'
  },
  { 
    id: '5.2-s3-isitd', 
    name: 'Programmation Orientée objet', 
    code: '5.2',
    url: 'https://drive.google.com/drive/folders/1UciJky6-EXW_CUJxcbvsGGsL_HNeTN4D?usp=drive_link'
  },
  { 
    id: '6.1-s3-isitd', 
    name: 'Systèmes intelligents', 
    code: '6.1',
    url: 'https://drive.google.com/drive/folders/1imuD2XgfdIzCBRT0o3hesAcCnAZn9lby?usp=drive_link'
  },
  { 
    id: '6.2-s3-isitd', 
    name: 'UML', 
    code: '6.2',
    url: 'https://drive.google.com/drive/folders/1mDrIIwhhne8NEiLVLnXJTAbFiFUzqmlJ?usp=drive_link'
  }
];

const semester3IssicCourses: Course[] = [
  { 
    id: '1.1-s3-issic', 
    name: 'Management de projet SI', 
    code: '1.1',
    url: 'https://drive.google.com/drive/folders/1W9a4ZNJqETWjKSSk1Y-lEXhCtlXT8A09?usp=drive_link'
  },
  { 
    id: '1.2-s3-issic', 
    name: 'UML', 
    code: '1.2',
    url: 'https://drive.google.com/drive/folders/1n3JL1hkDgk1D3Rlv9-Bv7qh3OSji9myA?usp=drive_link'
  },
  { 
    id: '2.1-s3-issic', 
    name: 'Java+ 2.2 - Projet OO', 
    code: '2.1',
    url: 'https://drive.google.com/drive/folders/1va387GDA10EeFIPw6M2CCBa3TrJknL4O?usp=drive_link'
  },
  { 
    id: '3.1-s3-issic', 
    name: 'Statistiques Inférentielles', 
    code: '3.1',
    url: 'https://drive.google.com/drive/folders/12b-02zPVx1-JI2dXgDN46RYJ2k2N8Dej?usp=drive_link'
  },
  { 
    id: '3.2-s3-issic', 
    name: 'Processus Stochastique', 
    code: '3.2',
    url: 'https://drive.google.com/drive/folders/1AVw644j2XQxAoTpbqPX-jYPidW2_aS0j?usp=drive_link'
  },
  { 
    id: '4.1-s3-issic', 
    name: 'Administration des systèmes d\'exploitation', 
    code: '4.1',
    url: 'https://drive.google.com/drive/folders/1RaVHVuMwAzkybxz-CclA5z2HyUO1fBTJ?usp=drive_link'
  },
  { 
    id: '4.2-s3-issic', 
    name: 'Introduction à la cybersécurité', 
    code: '4.2',
    url: 'https://drive.google.com/drive/folders/1t9WCjd0oB8AaFYZdUiSNNyQPwTYEjuil?usp=drive_link'
  },
  { 
    id: '5.1-s3-issic', 
    name: 'Théorie de l\'information', 
    code: '5.1',
    url: 'https://drive.google.com/drive/folders/1jhM_bKad4UZkMoVTcl6l75AoY_2bxgzV?usp=drive_link'
  },
  { 
    id: '5.2-s3-issic', 
    name: 'Traitement du signal', 
    code: '5.2',
    url: 'https://drive.google.com/drive/folders/1mYaTxqwtvuzcmvF98V4tCkaC6nHuh0pu?usp=drive_link'
  },
  { 
    id: '6.1-s3-issic', 
    name: 'Administration réseaux et virtualisation', 
    code: '6.1',
    url: 'https://drive.google.com/drive/folders/1nEowP3U9Zrv-E6TBpcpaW58ErEVPNk8z?usp=drive_link'
  },
  { 
    id: '6.2-s3-issic', 
    name: 'Couches hautes et gestion de réseau', 
    code: '6.2',
    url: 'https://drive.google.com/drive/folders/1G9E4cJ5P7j-aCw4Gt4gSO4oNrvQpz7lo?usp=drive_link'
  },
  { 
    id: '7.1-s3-issic', 
    name: 'Project Management', 
    code: '7.1',
    url: 'https://drive.google.com/drive/folders/16SPqEDFvTcpnwMAdkOKk6Vc_zwdBVptF?usp=drive_link'
  },
  { 
    id: '7.2-s3-issic', 
    name: 'Culture entrepreneuriale', 
    code: '7.2',
    url: 'https://drive.google.com/drive/folders/11pG6JT5olx_vVIE4BZPsLPHk1vCjnqyJ?usp=drive_link'
  },
  { 
    id: '8.1-s3-issic', 
    name: 'Communication Professionnelle', 
    code: '8.1',
    url: 'https://drive.google.com/drive/folders/12nvZUzVOSBHxOc0HN_FxAS4loG-OVrvn?usp=drive_link'
  },
  { 
    id: '8.2-s3-issic', 
    name: 'Business English', 
    code: '8.2',
    url: 'https://drive.google.com/drive/folders/1ZanPmXaOhM8Z4FCbr2p0OdcL1Sqmby5i?usp=drive_link'
  }
];

const semester4Courses: Course[] = [
  { 
    id: '1.1-s4', 
    name: 'Business English', 
    code: '1.1',
    url: 'https://drive.google.com/drive/folders/1blElXtF3n57nbAptvU8-3LXNjGNJ0li_?usp=drive_link'
  },
  { 
    id: '1.2-s4', 
    name: 'Communication Professionnelle', 
    code: '1.2',
    url: 'https://drive.google.com/drive/folders/1ptAGc-_vUdjWa3Wx1k6sUhBFUBmRgT2a?usp=drive_link'
  },
  { 
    id: '2.1-s4', 
    name: 'Transformation Digitale', 
    code: '2.1',
    url: 'https://drive.google.com/drive/folders/15QaIvVtNm4IjHTHNaIgyS7yYd4tOTPav?usp=drive_link'
  },
  { 
    id: '2.2-s4', 
    name: 'Cadre normatif de la sécurité', 
    code: '2.2',
    url: 'https://drive.google.com/drive/folders/1xaygbUu2Iun0P_imXmQpQMbDOM8akNsC?usp=drive_link'
  },
  { 
    id: '3.1-s4', 
    name: 'Projet Sécurité', 
    code: '3.1',
    url: 'https://drive.google.com/drive/folders/1799wcjf0GukM2bjYD_WgBiVyjrX077Da?usp=drive_link'
  },
  { 
    id: '3.2-s4', 
    name: 'Cryptocurrency & Blockchain', 
    code: '3.2',
    url: 'https://drive.google.com/drive/folders/1DQagr_OrYIX59rq12NPtNUf4wkFk9Ne8?usp=drive_link'
  },
  { 
    id: '4.1-s4', 
    name: 'Virtualisation et Conteneurisation', 
    code: '4.1',
    url: 'https://drive.google.com/drive/folders/1CKCOTS3dB-pwu-TdC3oFOnumqsCCXO2E?usp=drive_link'
  },
  { 
    id: '4.2-s4', 
    name: 'Systèmes et algorithmes répartis', 
    code: '4.2',
    url: 'https://drive.google.com/drive/folders/12avZldVojvyKy14yUP6uklU2BF9v1NNO?usp=drive_link'
  },
  { 
    id: '5.1-s4', 
    name: 'Advanced Machine Learning', 
    code: '5.1',
    url: 'https://drive.google.com/drive/folders/1WDhfMM-jlMqjekpqScfuoGQ0YQAWujFG?usp=drive_link'
  },
  { 
    id: '5.2-s4', 
    name: 'Bayesian Machine Learning', 
    code: '5.2',
    url: 'https://drive.google.com/drive/folders/1rasZhtxUGS-KRM3gi3j68Rudnc8O5VYW?usp=drive_link'
  },
  { 
    id: '6.1-s4', 
    name: 'Séries chronologiques', 
    code: '6.1',
    url: 'https://drive.google.com/drive/folders/1GIzXIEGTMQyX4EzO_Nxy65M2EfvRcJas?usp=drive_link'
  },
  { 
    id: '6.2-s4', 
    name: 'Modèles de régression', 
    code: '6.2',
    url: 'https://drive.google.com/drive/folders/13CfgzWcboIpNg-FZARnRH9krVlCqz8_Y?usp=drive_link'
  },
  { 
    id: '7.1-s4', 
    name: 'Base de Données NoSQL', 
    code: '7.1',
    url: 'https://drive.google.com/drive/folders/1vqoOfcnZVXxCJEIFQcjMgDQpuB9-RA9i?usp=drive_link'
  },
  { 
    id: '7.2-s4', 
    name: 'PLSQL et SQL avancés', 
    code: '7.2',
    url: 'https://drive.google.com/drive/folders/1hdZ2qxw4bpHbJqmhSOzOr3HuriyYN5dr?usp=drive_link'
  },
  { 
    id: '8.1-s4', 
    name: 'Développement Mobile', 
    code: '8.1',
    url: 'https://drive.google.com/drive/folders/1Rn3GR8piZV74aOxsi-yvIJ3Jex3Ihj58?usp=drive_link'
  },
  { 
    id: '8.2-s4', 
    name: 'Java EE', 
    code: '8.2',
    url: 'https://drive.google.com/drive/folders/1LRFSMD62pnQzypPf5k5LXDxLKcu_XYvA?usp=drive_link'
  }
];

const semester4IssicCourses: Course[] = [
  { 
    id: '1.1-s4-issic', 
    name: 'Java EE', 
    code: '1.1',
    url: 'https://drive.google.com/drive/folders/1LRFSMD62pnQzypPf5k5LXDxLKcu_XYvA?usp=drive_link'
  },
  { 
    id: '1.2-s4-issic', 
    name: 'Développement mobile', 
    code: '1.2',
    url: 'https://drive.google.com/drive/folders/1Rn3GR8piZV74aOxsi-yvIJ3Jex3Ihj58?usp=drive_link'
  },
  { 
    id: '2.1-s4-issic', 
    name: 'Protocoles et services de sécurité', 
    code: '2.1',
    url: 'https://drive.google.com/drive/folders/1xaygbUu2Iun0P_imXmQpQMbDOM8akNsC?usp=drive_link'
  },
  { 
    id: '2.2-s4-issic', 
    name: 'Sécurité des applications web et modèles de sécurité (S-SDLC)', 
    code: '2.2',
    url: 'https://drive.google.com/drive/folders/1799wcjf0GukM2bjYD_WgBiVyjrX077Da?usp=drive_link'
  },
  { 
    id: '3.1-s4-issic', 
    name: 'Arithmétique et théorie de nombre pour la cryptographie', 
    code: '3.1',
    url: 'https://drive.google.com/drive/folders/1DQagr_OrYIX59rq12NPtNUf4wkFk9Ne8?usp=drive_link'
  },
  { 
    id: '3.2-s4-issic', 
    name: 'Modèle de Régression', 
    code: '3.2',
    url: 'https://drive.google.com/drive/folders/13CfgzWcboIpNg-FZARnRH9krVlCqz8_Y?usp=drive_link'
  },
  { 
    id: '4.1-s4-issic', 
    name: 'Bayesian Machine learning', 
    code: '4.1',
    url: 'https://drive.google.com/drive/folders/1rasZhtxUGS-KRM3gi3j68Rudnc8O5VYW?usp=drive_link'
  },
  { 
    id: '4.2-s4-issic', 
    name: 'Advanced Machine learning', 
    code: '4.2',
    url: 'https://drive.google.com/drive/folders/1WDhfMM-jlMqjekpqScfuoGQ0YQAWujFG?usp=drive_link'
  },
  { 
    id: '5.1-s4-issic', 
    name: 'Systèmes et algorithmes répartis', 
    code: '5.1',
    url: 'https://drive.google.com/drive/folders/12avZldVojvyKy14yUP6uklU2BF9v1NNO?usp=drive_link'
  },
  { 
    id: '5.2-s4-issic', 
    name: 'Virtualisation et Conteneurisation', 
    code: '5.2',
    url: 'https://drive.google.com/drive/folders/1CKCOTS3dB-pwu-TdC3oFOnumqsCCXO2E?usp=drive_link'
  },
  { 
    id: '6.1-s4-issic', 
    name: 'Blockchain', 
    code: '6.1',
    url: 'https://drive.google.com/drive/folders/1DQagr_OrYIX59rq12NPtNUf4wkFk9Ne8?usp=drive_link'
  },
  { 
    id: '6.2-s4-issic', 
    name: 'Cryptographie', 
    code: '6.2',
    url: 'https://drive.google.com/drive/folders/1DQagr_OrYIX59rq12NPtNUf4wkFk9Ne8?usp=drive_link'
  },
  { 
    id: '7.1-s4-issic', 
    name: 'Gestion des indentités', 
    code: '7.1',
    url: 'https://drive.google.com/drive/folders/1xaygbUu2Iun0P_imXmQpQMbDOM8akNsC?usp=drive_link'
  },
  { 
    id: '7.2-s4-issic', 
    name: 'Infrastructures de gestion des clés', 
    code: '7.2',
    url: 'https://drive.google.com/drive/folders/1xaygbUu2Iun0P_imXmQpQMbDOM8akNsC?usp=drive_link'
  },
  { 
    id: '8.1-s4-issic', 
    name: 'Cadre normatif de la sécurité', 
    code: '8.1',
    url: 'https://drive.google.com/drive/folders/1xaygbUu2Iun0P_imXmQpQMbDOM8akNsC?usp=drive_link'
  },
  { 
    id: '8.2-s4-issic', 
    name: 'Cadre réglementaire de protection et d\'accès à l\'information', 
    code: '8.2',
    url: 'https://drive.google.com/drive/folders/1xaygbUu2Iun0P_imXmQpQMbDOM8akNsC?usp=drive_link'
  }
];

const semester5Courses: Course[] = [
  { 
    id: '1.1-s5', 
    name: 'Préparation au TOEIC', 
    code: '1.1',
    url: 'https://drive.google.com/drive/folders/1S8Jaua7Fvpi3svDFqn8pKPOV_cBDjkzd?usp=drive_link'
  },
  { 
    id: '1.2-s5', 
    name: 'Méthodologie de réalisation du PFE', 
    code: '1.2',
    url: 'https://drive.google.com/drive/folders/1LrSEKjUrSYiwlIMKhfUOHUFqU1iusnAU?usp=drive_link'
  },
  { 
    id: '2.1-s5', 
    name: 'Startup et Innovation', 
    code: '2.1',
    url: 'https://drive.google.com/drive/folders/1eRVxbitpVMo-CRBbhBOeSPe9PEbCFT8Q?usp=drive_link'
  },
  { 
    id: '2.2-s5', 
    name: 'Risk Management', 
    code: '2.2',
    url: 'https://drive.google.com/drive/folders/1qH5-f3J9mifyShKWBvu87pTkmfUvpjeD?usp=drive_link'
  },
  { 
    id: '3.1-s5', 
    name: 'Cognitive Computing and Knowledge', 
    code: '3.1',
    url: 'https://drive.google.com/drive/folders/12FaladO8reeSAbY4PhFOy5UBTmgMJxVN?usp=drive_link'
  },
  { 
    id: '3.2-s5', 
    name: 'Text Mining and Analytics', 
    code: '3.2',
    url: 'https://drive.google.com/drive/folders/1dRGdIO7C7YBKv9TVtBKxg7eI1eqaYFmC?usp=drive_link'
  },
  { 
    id: '4.1-s5', 
    name: 'Projet CV', 
    code: '4.1',
    url: 'https://drive.google.com/drive/folders/1iwx6ZaBveC67-DjktgvAcPfeISaqQd4o?usp=drive_link'
  },
  { 
    id: '4.2-s5', 
    name: 'Computer Vision & Pattern Recognition', 
    code: '4.2',
    url: 'https://drive.google.com/drive/folders/1ZiyMNapnTHizcvmKBvLNe9dsAXmIBZu3?usp=drive_link'
  },
  { 
    id: '5.1-s5', 
    name: 'Internet Of Things (IoT)', 
    code: '5.1',
    url: 'https://drive.google.com/drive/folders/1A0ETK8xgbIaMT5NdVezu5CxzmL0WsflZ?usp=drive_link'
  },
  { 
    id: '5.2-s5', 
    name: 'Cloud Computing', 
    code: '5.2',
    url: 'https://drive.google.com/drive/folders/1H5p26EJdxitUxVRMYdaVE6mhGdP5QphE?usp=drive_link'
  },
  { 
    id: '6.1-s5', 
    name: 'Deep Learning', 
    code: '6.1',
    url: 'https://drive.google.com/drive/folders/1zAhebXf9SwTlEtJxxAsV0s-tiFBR9yxD?usp=drive_link'
  },
  { 
    id: '6.2-s5', 
    name: 'Big Data Analytics', 
    code: '6.2',
    url: 'https://drive.google.com/drive/folders/1uX8Wl6vO2s_OyNwxtBeYNSKfhcmbqWy7?usp=drive_link'
  },
  { 
    id: '7.1-s5', 
    name: 'Big Data Platforms', 
    code: '7.1',
    url: 'https://drive.google.com/drive/folders/1ITenIhQJUw5c7VvY39MKRRJvWDBBaQHw?usp=drive_link'
  },
  { 
    id: '7.2-s5', 
    name: 'Data Modeling', 
    code: '7.2',
    url: 'https://drive.google.com/drive/folders/1s67S8Rd_AJxqLSAQqxxrHqpIZCBcXuus?usp=drive_link'
  },
  { 
    id: '8.1-s5', 
    name: 'Projet BI', 
    code: '8.1',
    url: 'https://drive.google.com/drive/folders/1z7AGEVI7wJEIDDo_bG8qVJ7vQ4KSvjpv?usp=drive_link'
  },
  { 
    id: '8.2-s5', 
    name: 'Business Intelligence', 
    code: '8.2',
    url: 'https://drive.google.com/drive/folders/1E9QgRuiKdOt5gHeqcwcYzI6TqUJHAMVS?usp=drive_link'
  }
];

const CoursePage: React.FC = () => {
  const { department } = useParams<{ department: string }>();
  const { isDarkMode } = useTheme();
  const [activeSemester, setActiveSemester] = useState<number>(1);
  const navigate = useNavigate();

  const handleCourseClick = (course: Course) => {
    if (course.url) {
      window.open(course.url, '_blank');
    }
  };

  const semesters = [
    { id: 1, name: 'Semestre 1' },
    { id: 2, name: 'Semestre 2' },
    { id: 3, name: 'Semestre 3' },
    { id: 4, name: 'Semestre 4' },
    { id: 5, name: 'Semestre 5' }
  ];

  const getDepartmentName = (id: string) => {
    switch (id) {
      case 'informatique':
        return 'ICSD';
      case 'civil':
        return 'ISITD';
      case 'electrique':
        return 'ISSIC';
      case 'industriel':
        return 'IIN';
      default:
        return 'Département';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            {getDepartmentName(department || '')} - Cours
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Accédez aux cours par semestre
          </p>
        </div>

        {/* Semester Navigation */}
        <div className="flex justify-center space-x-4 mb-8">
          {semesters.map((semester) => (
            <button
              key={semester.id}
              onClick={() => setActiveSemester(semester.id)}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeSemester === semester.id
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {semester.name}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeSemester === 1 && semester1Courses.map((course) => (
            <button
              key={course.id}
              onClick={() => handleCourseClick(course)}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-200 text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {course.name}
                  </h3>
                </div>
                <div className="text-indigo-600 dark:text-indigo-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
          {activeSemester === 2 && department === 'informatique' && semester2IcsdCourses.map((course) => (
            <button
              key={course.id}
              onClick={() => handleCourseClick(course)}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-200 text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {course.name}
                  </h3>
                </div>
                <div className="text-indigo-600 dark:text-indigo-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
          {activeSemester === 2 && department === 'civil' && semester2IsitdCourses.map((course) => (
            <button
              key={course.id}
              onClick={() => handleCourseClick(course)}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-200 text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {course.name}
                  </h3>
                </div>
                <div className="text-indigo-600 dark:text-indigo-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
          {activeSemester === 2 && department === 'electrique' && semester2IssicCourses.map((course) => (
            <button
              key={course.id}
              onClick={() => handleCourseClick(course)}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-200 text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {course.name}
                  </h3>
                </div>
                <div className="text-indigo-600 dark:text-indigo-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
          {activeSemester === 2 && department === 'industriel' && semester2InnCourses.map((course) => (
            <button
              key={course.id}
              onClick={() => handleCourseClick(course)}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-200 text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {course.name}
                  </h3>
                </div>
                <div className="text-indigo-600 dark:text-indigo-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
          {activeSemester === 3 && department === 'informatique' && semester3Courses.map((course) => (
            <button
              key={course.id}
              onClick={() => handleCourseClick(course)}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-200 text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {course.name}
                  </h3>
                </div>
                <div className="text-indigo-600 dark:text-indigo-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
          {activeSemester === 3 && department === 'civil' && semester3IsitdCourses.map((course) => (
            <button
              key={course.id}
              onClick={() => handleCourseClick(course)}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-200 text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {course.name}
                  </h3>
                </div>
                <div className="text-indigo-600 dark:text-indigo-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
          {activeSemester === 4 && department === 'informatique' && semester4Courses.map((course) => (
            <button
              key={course.id}
              onClick={() => handleCourseClick(course)}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-200 text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {course.name}
                  </h3>
                </div>
                <div className="text-indigo-600 dark:text-indigo-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
          {activeSemester === 4 && department === 'electrique' && semester4IssicCourses.map((course) => (
            <button
              key={course.id}
              onClick={() => handleCourseClick(course)}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-200 text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {course.name}
                  </h3>
                </div>
                <div className="text-indigo-600 dark:text-indigo-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
          {activeSemester === 5 && department === 'informatique' && semester5Courses.map((course) => (
            <button
              key={course.id}
              onClick={() => handleCourseClick(course)}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-200 text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {course.name}
                  </h3>
                </div>
                <div className="text-indigo-600 dark:text-indigo-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
          {(activeSemester > 5 || (activeSemester === 5 && department !== 'informatique') || (activeSemester === 4 && department !== 'informatique') || (activeSemester === 3 && department !== 'informatique') || (activeSemester === 2 && !['informatique', 'electrique'].includes(department || ''))) && (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Les cours pour ce semestre seront bientôt disponibles.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePage; 