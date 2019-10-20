const allBreakpoints = {
    'matches': [{ val: 1000, grade: 50 }, { val: 4000, grade: 100 }, { val: 8000, grade: 300 }, { val: 15000, grade: 400 }],
    'wins': [{ val: 500, grade: 50 }, { val: 1000, grade: 100 }, { val: 1500, grade: 300 }, { val: 2000, grade: 400 }],
    'win_percentage': [{ val: 5, grade: 50 }, { val: 10, grade: 100 }, { val: 15, grade: 300 }, { val: 25, grade: 400 }],
    'kills': [{ val: 2000, grade: 50 }, { val: 5000, grade: 100 }, { val: 10000, grade: 300 }, { val: 20000, grade: 400 }],
    'kd': [{ val: 1, grade: 50 }, { val: 2, grade: 100 }, { val: 3, grade: 300 }, { val: 5, grade: 400 }]
};

const currentBreakpoints = {
    'matches': [{ val: 100, grade: 50 }, { val: 200, grade: 100 }, { val: 400, grade: 300 }, { val: 800, grade: 400 }],
    'wins': [{ val: 30, grade: 50 }, { val: 80, grade: 100 }, { val: 150, grade: 300 }, { val: 300, grade: 400 }],
    'win_percentage': [{ val: 5, grade: 50 }, { val: 10, grade: 100 }, { val: 15, grade: 300 }, { val: 25, grade: 400 }],
    'kills': [{ val: 100, grade: 50 }, { val: 300, grade: 100 }, { val: 800, grade: 300 }, { val: 2000, grade: 400 }],
    'kd': [{ val: 1, grade: 50 }, { val: 2, grade: 100 }, { val: 3, grade: 300 }, { val: 5, grade: 400 }]
};

const grading = {
    all: allBreakpoints,
    current: currentBreakpoints
};

export const getGrading = (id, value, view) => {
    const breakpoints = grading[view || 'all'][id];
    if (breakpoints) {
        for (var i = 0; i < breakpoints.length; i++) {
            const { val, grade } = breakpoints[i];
            if (value < val) {
                return grade;
            }
        }
        return 500;
    }
    
    return 50;
}