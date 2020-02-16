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
  user_id: Number
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
  subject_id: Number
  body: string
  answers?: Answer[]
}

interface Answer extends Model {
  question_id: Number
  body: string
  correct: Boolean
}
