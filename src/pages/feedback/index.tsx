import Button from '@app/components/Button';
import './feedback.css';


const Feedback = () => {
  return (
    <div className="feedback-main">
      <div className="feedback-image">
        <img
          src="/feedback.png"
          alt="Feedback Illustration"
          className="feed-image"
        />
      </div>
      <div className="feedback-form">
      <form className='w-full flex flex-col'>
        <h1 className="feedback-header text-3xl font-bold">Feedback</h1>
        <p className="feedback-description text-md mt-2">Write your detailed feedback.</p>
          <div className="name-group">
            <div className="form-group">
              <label htmlFor="first-name" className='text-lg font-semibold'>First Name</label>
              <input
                type="text"
                id="first-name"
                placeholder="Placeholder"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="last-name" className='text-lg font-semibold'>Last Name</label>
              <input
                type="text"
                id="last-name"
                placeholder="Placeholder"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email" className='text-lg font-semibold'>Email</label>
            <input type="email" id="email" placeholder="Placeholder" required />
          </div>
          <div className="form-group ">
            <label htmlFor="feedback" className='text-lg font-semibold'>Feedback</label>
            <textarea
              id="feedback"
              placeholder="Placeholder"
              rows={4}
              required
            />
          </div>
          <Button type="submit" className="bg-blue-500 font-semibold text-white">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
