from ..models.goal import Goal


class GoalController:
    def __init__(self, db):
        self.db = db

    def set_goal(self, user_id, goal_type, attributes):
        # Generate goal ID
        goal = Goal(user_id=user_id, goal_type=goal_type, attributes=attributes)

        try:
            self.db.session.add(goal)
            self.db.session.commit()
            return {"message": "Goal created successfully", "goal_id": goal.id}, 201
        except Exception as e:
            self.db.rollback()
            return {"message": "Failed to create a goal"}, 500

    def get_goal(self, goal_id, user_id):
        goal = Goal.query.filter_by(id=goal_id, user_id=user_id).first()

        if goal:
            return {
                "goal_id": goal.id,
                "user_id": goal.user_id,
                "goal_type": goal.goal_type,
                "attributes": goal.attributes,
            }
        else:
            return {"message": "Goal not found"}, 404

    def update_goal(self, goal_id, user_id, goal_type, attributes):
        # Update goal by ID
        goal = Goal.query.filter_by(id=goal_id, user_id=user_id).first()

        if goal:
            goal.goal_type = goal_type
            goal.attributes = attributes

            try:
                self.db.session.commit()
                return {"message": "Goal updated successfully", "goal_id": goal.id}
            except Exception as e:
                self.db.rollback()
                return {"message": "Failed to update goal"}, 500
        else:
            return {"message": "Goal not found"}, 404

    def delete_goal(self, goal_id, user_id):
        goal = Goal.query.filter_by(id=goal_id, user_id=user_id).first()

        if goal:
            try:
                self.db.session.delete(goal)
                self.db.session.commit()
                return {"message": "Goal deleted successfully"}
            except Exception as e:
                self.db.rollback()
                return {"message": "Failed to delete the goal"}, 500
        else:
            return {"message": "Goal not found"}, 404
