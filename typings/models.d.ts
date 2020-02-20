interface Model {
  id: number
  created_at: string
  updated_at: string
  deleted_at?: string
}

interface User extends Model {
  type: 'reviewee' | 'admin'
  name: string
  email: string
  reviewee_profile: RevieweeProfile
}

interface RevieweeProfile extends Model {
  user_id: number
  reviewee_number: string
  enrolled_for: string
  expired_at?: string
}

interface Subject extends Model {
  name: string
  body?: string
  questions?: Question[]
}

interface Question extends Model {
  subject_id: number
  body: string
  answers?: Answer[]
}

interface Answer extends Model {
  question_id: number
  body: string
  correct: Boolean
}

interface Quiz extends Model {
  user_id: number
  subject_id: number
  time_mode: 'classic' | 'timed'
  checking_mode: 'per_item' | 'per_quiz'
  question_count: number
  completed_at?: string
  user: User
  subject: Subject
  questuons: QuizQuestion[]
  answers: QuizAnswer[]
}

interface QuizQuestion extends Model {
  quiz_id: number
  question_id: number
}

interface QuizAnswer extends Model {
  quiz_id: number
  answer_id: number
}
