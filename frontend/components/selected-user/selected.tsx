import { styled } from '@nextui-org/react';
import { useContext } from 'react';
import { User } from '../../context';

const StyledBadge = styled('span', {
    display: 'inline-block',
    textTransform: 'uppercase',
    padding: '$2 $3',
    margin: '0 2px',
    fontSize: '10px',
    fontWeight: '$bold',
    borderRadius: '14px',
    letterSpacing: '0.6px',
    lineHeight: 1,
    boxShadow: '1px 2px 5px 0px rgb(0 0 0 / 5%)',
    alignItems: 'center',
    alignSelf: 'center',
    color: '$white',
    variants: {
        type: {
            active: {
                bg: '$successLight',
                color: '$successLightContrast',
            },
            paused: {
                bg: '$errorLight',
                color: '$errorLightContrast',
            },
            vacation: {
                bg: '$warningLight',
                color: '$warningLightContrast',
            },
        },
    },
    defaultVariants: {
        type: 'active',
    },
});

export default function SelectedHandle() {
    const { selectedTestUser } = useContext(User);
    return (
        <>
            {selectedTestUser.id && (
                <StyledBadge type="active">{selectedTestUser.handle}</StyledBadge>
            )}
        </>
    )
}
