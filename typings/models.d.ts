interface Model {
  id: number
  created_at: String
  updated_at: String
  deleted_at?: String
}

interface User extends Model {
  type: 'reviewee' | 'admin'
  name: String
  email: String
  reviewee_profile: RevieweeProfile
}

interface RevieweeProfile extends Model {
  user_id: Number
  reviewee_number: String
  enrolled_for: String
  expired_at?: String
}
