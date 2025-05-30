import sys

with open('debug_log.txt', 'w') as f:
    f.write("Starting debug script\n")
    try:
        from app import app
        f.write("Successfully imported app\n")
        
        f.write("Testing faq_items variable\n")
        from app import faq_items
        f.write(f"faq_items exists and has {len(faq_items)} items\n")
        
        f.write("Starting Flask app\n")
        app.run(debug=True)
    except Exception as e:
        f.write(f"Error: {str(e)}\n")
        import traceback
        traceback_str = traceback.format_exc()
        f.write(traceback_str) 