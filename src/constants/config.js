// Import transformation images
import client1FrontBefore from '../assets/transformations/client_1_front_before.jpg';
import client1FrontAfter from '../assets/transformations/client_1_front_after.jpg';
import client1BackBefore from '../assets/transformations/client_1_back_before.jpg';
import client1BackAfter from '../assets/transformations/client_1_back_after.jpg';
import client2FrontBefore from '../assets/transformations/client_2_front_before.jpg';
import client2FrontAfter from '../assets/transformations/client_2_front_after.jpg';
import client2BackBefore from '../assets/transformations/client_2_back_before.jpg';
import client2BackAfter from '../assets/transformations/client_2_back_after.jpg';

export const SITE_CONFIG = {
  title: "DR FARES COACHING",
  description: "Professional training and fitness services by DR FARES COACHING",
  whatsapp: "+201001928364",
  socialLinks: {
    instagram: "https://www.instagram.com/dr.fares.coaching",
    facebook: "https://www.facebook.com/dr.fares.coaching", 
    tiktok: "https://www.tiktok.com/@dr.fares.coaching",
    youtube: "https://www.youtube.com/@dr.fares.coaching"
  }
};

export const SERVICES = [
  {
    id: 1,
    title: "Personal Training",
    description: "One-on-one training sessions tailored to your specific needs and goals.",
    icon: "🏋️‍♂️",
    features: [
      "Personalized workout plans",
      "Nutrition guidance",
      "Progress tracking",
      "Regular assessments"
    ]
  },
  {
    id: 2,
    title: "Group Sessions",
    description: "High-energy group workouts combining strength, cardio, and mobility training.",
    icon: "👥",
    features: [
      "Motivating team environment",
      "Cost-effective training",
      "Social workout experience",
      "Varied workout styles"
    ]
  },
  {
    id: 3,
    title: "Online Coaching",
    description: "Remote training and support accessible from anywhere in the world.",
    icon: "🌐",
    features: [
      "Weekly video check-ins",
      "Custom workout programs",
      "Nutrition planning",
      "24/7 messaging support"
    ]
  }
];

export const PACKAGES = [
  {
    title: "Starter",
    price: "$99",
    period: "per month",
    features: [
      "2 one-on-one sessions per month",
      "Email support",
      "Basic goal setting",
      "Progress tracking",
      "Access to online resources"
    ],
    highlighted: false
  },
  {
    title: "Professional",
    price: "$199",
    period: "per month",
    features: [
      "4 one-on-one sessions per month",
      "Priority email & chat support",
      "Advanced goal setting",
      "Weekly progress reports",
      "Access to all online resources",
      "Group workshop access"
    ],
    highlighted: true
  },
  {
    title: "Elite",
    price: "$299",
    period: "per month",
    features: [
      "8 one-on-one sessions per month",
      "24/7 priority support",
      "Customized action plans",
      "Daily progress tracking",
      "Access to all resources",
      "All group workshops",
      "1-on-1 strategy sessions"
    ],
    highlighted: false
  }
];

export const FAQS = [
  {
    question: "مين يقدر ينضم للبرنامج؟",
    answer: "اي حد حابب يوصل لهدفك ويخلي حياتك افضل"
  },
  {
    question: "هل بتمرن بنات؟",
    answer: "ايوا بس المتابعه بدون صور ولو حبيتي ممكن يبقي التواصل من خلال الوالد او الأخ"
  },
  {
    question: "بستلم البرنامج فى قد اية؟",
    answer: "من يوم ل ٣ أيام كحد اقصي"
  },
  {
    question: "إيه سياسة الاسترجاع؟",
    answer: "يمكنك استرداد كامل مبلغ الاشتراك اذا لم يتم استلام اى خطط , لاكن اذا تم استلام البرنامج لا يسمح باسترداد المبلغ"
  },
  {
    question: "هل يوجد متابعة و فحوصات؟",
    answer: "طبعا في الباقه الفضيه بتابعك كل أسبوع وفالباقه الذهبيه متابعه يوميه"
  },
  {
    question: "الاشتراك بيبدأ امتى؟",
    answer: "اول ما يوصلك جداول الشغل"
  },
  {
    question: "هل لازم أنشر تحول العميل؟",
    answer: "يفضل بس لو العميل مش حابب فا دي خصوصيه وأنا مقدرش أتعداها"
  }
];

export const TRANSFORMATIONS = [
  {
    id: 1,
    name: "Fares Mosaad",
    role: "Engineering Student",
    duration: "2 months",
    achievement: "Fat Loss While Preserving Muscle",
    story: "As an engineering student focused on his studies, most of his day is spent in lectures and studying, which led to rounded shoulders. Despite this, he managed to stay committed and lost 8kg in 2 months while addressing his posture issues. He's still continuing as this is not even 20% of his goal.",
    images: {
      frontBefore: client1FrontBefore,
      frontAfter: client1FrontAfter,
      backBefore: client1BackBefore,
      backAfter: client1BackAfter,
    }
  },
  {
    id: 2,
    name: "Yousef Al-Nazer",
    role: "Student & Working Professional",
    duration: "3 months",
    achievement: "Muscle Gain with Minimal Fat",
    story: "Despite having limited time due to work and studies, he remained committed to his diet and training, providing regular feedback. This dedication helped him address his posture issues and achieve his impressive physique. He's still continuing as he aims to reach his ultimate fitness goals.",
    images: {
      frontBefore: client2FrontBefore,
      frontAfter: client2FrontAfter,
      backBefore: client2BackBefore,
      backAfter: client2BackAfter,
    }
  }
]; 